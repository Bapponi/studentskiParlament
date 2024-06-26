import express, { Request, Response } from 'express';
import { LinkController } from '../api/LinkController';

const linkRouter = express.Router();

linkRouter.route('/').get((req: Request, res: Response) => {
    new LinkController().getAllLinks(req, res);
});

export default linkRouter;