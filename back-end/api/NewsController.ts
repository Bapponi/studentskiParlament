import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/links/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

export class NewsController {

    public getAllNews(req: Request, res: Response): void {
        
    }

    public uploadNewsFile(req: Request, res: Response): void {
        
    }

    public deleteNews(req: Request, res: Response): void {
        
    }

    public updateNews(req: Request, res: Response): void {
        
    }
}
