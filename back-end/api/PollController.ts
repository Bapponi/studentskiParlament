import { Request, Response } from 'express';
import client from '../database';

interface PollOption{
  option_name: string,
  votes_num: number,
}

interface Poll{
  id: number,
  title: string,
  active: boolean
  poll_options: PollOption[],
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
    const query = 'SELECT * FROM polls INNER JOIN poll_options ON polls.id = poll_options.poll_id;';
    client.query(query, (err, result) => {
      if (!err) {
        let polls: Poll[] = [];
        let poll: Poll | null = null;
        let currentId: number | null = null;

        result.rows.forEach((row)=>{
          if (currentId !== row.poll_id) {
            if (poll) {
              polls.push(poll);
            }

            poll = {
              id: row.poll_id,
              title: row.title,
              active: row.active,
              poll_options: []
            };
            currentId = row.poll_id;
          }

          if (poll) {
            poll.poll_options.push({
              option_name: row.option_name,
              votes_num: row.votes_num
            });
          }
        })

        if (poll) {
          polls.push(poll);
        }

        const camelCaseLinks = polls.map(convertKeysToCamelCase);
        res.status(200).send(camelCaseLinks);
      } else {
        return res.status(500).send('Грешка у бази!');
      }
    });
  }

  public getPollWithId(req: Request, res: Response): void {
    
  }

  public async uploadPoll(req: Request, res: Response) {
    const { title, elements, optionValues } = req.body;

    try {
      const pollInsertQuery = 'INSERT INTO polls (title) VALUES ($1) RETURNING id';
      const pollInsertResult = await client.query(pollInsertQuery, [title]);
      const pollId = pollInsertResult.rows[0].id;

      const pollOptionInsertQuery = 'INSERT INTO poll_options (option, poll_id) VALUES ($1, $2)';
      
      let i: number = 1
      for (const element of elements) {
        
        const optionValue = optionValues[i];
        if (optionValue) {
          await client.query(pollOptionInsertQuery, [optionValue, pollId]);
        }
        i++
      }
      
      return res.status(200).send('Успешно качење гласања!');
    } catch (error) {
      console.error('Error uploading poll:', error);
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

  public updatePoll(req: Request, res: Response): void {

  }
}
