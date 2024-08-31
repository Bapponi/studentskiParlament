import { Request, Response } from 'express';
import client from '../database';
require('dotenv').config();

interface PollOption{
  option_name: string,
  votes_num: number,
}

interface Poll{
  id: number,
  title: string,
  active: boolean
  poll_options: PollOption[],
  members_voted: string[],
  voted: boolean,
}

const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

const convertKeysToCamelCase = <T extends Record<string, any>>(obj: T): Record<string, any> => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[toCamelCase(key)] = obj[key];
    }
  }
  return newObj;
};

export class PollController {

  public getAllPolls(req: Request, res: Response): void {
    const { userId } = req.params;
  
    const pollsQuery = `
      SELECT 
        polls.id AS poll_id, 
        polls.title, 
        polls.active, 
        poll_options.id AS option_id, 
        poll_options.option_name, 
        poll_options.votes_num 
      FROM polls 
      INNER JOIN poll_options ON polls.id = poll_options.poll_id 
      ORDER BY polls.id DESC, poll_options.id;
    `;
  
    client.query(pollsQuery, (pollsErr, pollsResult) => {
      if (!pollsErr) {
        let polls: Poll[] = [];
        let poll: Poll | null = null;
        let currentId: number | null = null;
  
        pollsResult.rows.forEach((row) => {
          if (currentId !== row.poll_id) {
            if (poll) {
              polls.push(poll);
            }
  
            poll = {
              id: row.poll_id,
              title: row.title,
              active: row.active,
              poll_options: [],
              members_voted: [], 
              voted: false,
            };
            currentId = row.poll_id;
          }
  
          if (poll) {
            poll.poll_options.push({
              option_name: row.option_name,
              votes_num: row.votes_num
            });
          }
        });
  
        if (poll) {
          polls.push(poll);
        }
  
        const fetchAllMembersAndCheckVotes = polls.map((poll) =>
          this.fetchMembersForPoll(poll).then(() => this.checkUserVoted(poll, parseInt(userId)))
        );
  
        Promise.all(fetchAllMembersAndCheckVotes)
          .then(() => {
            const camelCaseLinks = polls.map(convertKeysToCamelCase);
            res.status(200).send(camelCaseLinks);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      } else {
        return res.status(500).send('Грешка у бази!');
      }
    });
  }
  
  private fetchMembersForPoll = (poll: Poll): Promise<void> => {
    const membersQuery = `
      SELECT members.name 
      FROM votes 
      INNER JOIN members ON votes.member_id = members.id 
      WHERE votes.poll_id = $1;
    `;
    return new Promise((resolve, reject) => {
      client.query(membersQuery, [poll.id], (membersErr, membersResult) => {
        if (!membersErr) {
          poll.members_voted = membersResult.rows.map((row) => row.name);
          resolve();
        } else {
          reject('Грешка у бази!');
        }
      });
    });
  };
  
  private checkUserVoted = (poll: Poll, userId: number): Promise<void> => {
    const userVotedQuery = 'SELECT COUNT(*) FROM votes WHERE member_id = $1 AND poll_id = $2';
    return new Promise((resolve, reject) => {
      client.query(userVotedQuery, [userId, poll.id], (userVotedErr, userVotedResult) => {
        if (!userVotedErr) {
          poll.voted = userVotedResult.rows[0].count > 0;
          resolve();
        } else {
          reject('Грешка у бази!');
        }
      });
    });
  };

  public async createPoll(req: Request, res: Response) {
    const { title, optionValues } = req.body;
    
    if(Object.keys(optionValues).length < 2){
      return res.status(400).send('Морају да постоје минимун две опције у склопу анкете!');
    }

    try {
      const pollInsertQuery = 'INSERT INTO polls (title) VALUES ($1) RETURNING id';
      const pollInsertResult = await client.query(pollInsertQuery, [title]);
      const pollId = pollInsertResult.rows[0].id;

      const pollOptionInsertQuery = 'INSERT INTO poll_options (option_name, poll_id) VALUES ($1, $2)';

      if (optionValues) {
        Object.entries(optionValues).forEach(([key, value]) => {
            const values = [value, pollId];
            client.query(pollOptionInsertQuery, values);
        });
      }
      
      return res.status(200).send('Успешно качење гласања!');
    } catch (error) {
      return res.status(500).send('Грешка у бази!');
    }
  }

  public deletePoll = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const deletePollOptionsQuery = 'DELETE FROM poll_options WHERE poll_id = $1';
    const deletePollQuery = 'DELETE FROM polls WHERE id = $1 RETURNING *';

    try {
      await client.query(deletePollOptionsQuery, [id]);
      const result = await client.query(deletePollQuery, [id]);

      if (result.rows.length === 0) {
        res.status(404).send('Није пронађено гласање');
      } else {
        res.status(200).json('Успешно избрисано гласање');
      }
    } catch (err) {
      res.status(500).send('Грешка у бази!');
    } 
  }

  public updatePollActivityStatus(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    const active = req.body.active;

    const query = 'UPDATE polls SET active = $1 WHERE id = $2';
    const values = [active, id]

    client.query(query, values, (err, members) => {
      if (!err) {
        const camelCaseLinks = members.rows.map(convertKeysToCamelCase);
        res.status(200).send(camelCaseLinks);
      } else {
        return res.status(500).send('Грешка у бази!');
      }
    });
  }

  public pollVote(req: Request, res: Response){

    if(req.body.voteOption == ''){
      return res.status(400).send('Молим вас да унесете за шта гласате');
    }

    const queryVote = 'INSERT INTO votes (poll_id, member_id) VALUES($1, $2)';
    const valuesVote = [req.body.pollId, req.body.userId]
    try{
      client.query(queryVote, valuesVote);

      const queryPollOption = 'UPDATE poll_options SET votes_num = votes_num + 1 WHERE option_name = $1';
      const valuesPollOptions = [req.body.voteOption]

      client.query(queryPollOption, valuesPollOptions);
      res.status(200).json('Успешно обављено гласање');

    }catch(error){
      return res.status(500).send('Грешка у бази!');
    }
    
  }

}