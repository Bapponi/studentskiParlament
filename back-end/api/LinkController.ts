import { Request, Response } from 'express';
import client from '../database';

export class LinkController {
    public getAllLinks(req: Request, res: Response): void {
        client.query('SELECT * FROM links', (err, links) => {
            if (!err) {
                res.status(200).send(links.rows);
            } else {
                console.log(err.message);
            }
        });
    }
}