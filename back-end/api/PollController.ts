import { Request, Response } from 'express';
import client from '../database';

export class PollController {

  public getAllPolls(req: Request, res: Response): void {
    const query = 'SELECT * FROM polls;';
    client.query(query, (err, polls) => {
      if (!err) {
          res.status(200).send(polls.rows);
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
      
      return res.status(200).send('Poll and options uploaded successfully');
    } catch (error) {
      console.error('Error uploading poll:', error);
      return res.status(500).send('Internal server error');
    }
  }

  public deletePoll(req: Request, res: Response): void {

  }

  public updatePoll(req: Request, res: Response): void {

  }
}
