import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/news/');
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

      upload.fields([
        { name: 'banner', maxCount: 1 },
        { name: 'uploadedFiles', maxCount: 10 },
      ])(req, res, (err) => {
        // if (err) {
        //   return res.status(400).send('File upload error');
        // }
    
        // Log the request body and files
        console.log(req.body);
        console.log(req.files);
    
        // Parse other fields
        const title = req.body.title;
        const elements = JSON.parse(req.body.elements);
        const headerValues = req.body.headerValues ? JSON.parse(req.body.headerValues) : {};
        const textValues = req.body.textValues ? JSON.parse(req.body.textValues) : {};
    
        // console.log({ title, elements, headerValues, textValues });
    
        // Process the data as needed (e.g., store in the database)
    
        res.status(200).send('News uploaded successfully');
      });
    }

    public deleteNews(req: Request, res: Response): void {
        
    }

    public updateNews(req: Request, res: Response): void {
        
    }
}
