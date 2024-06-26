import { Request, Response } from 'express';

export class LinkController {
    public getAllLinks(req: Request, res: Response): void {
        res.send('Handling link get request');
    }
}