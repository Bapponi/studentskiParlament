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

function parseDate(dateString: string): string {
  const date = new Date(dateString);
  date.setUTCDate(date.getUTCDate() + 1) //mozda izmeniti kasnije

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${day}. ${month}. ${year}.`;
}

export class NewsController {

  public getAllNews(req: Request, res: Response): void {
    const countQuery = 'SELECT COUNT(*) FROM news';
    client.query(countQuery, (err, countResult) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Грешка у бази!');
      }

      const rowCount = parseInt(countResult.rows[0].count, 10);

      let limit = parseInt(req.query.limit as string, 10) || rowCount;
      let offset = parseInt(req.query.offset as string, 10) || 0;

      const fetchQuery = 'SELECT * FROM news ORDER BY id DESC LIMIT $1 OFFSET $2';
      const values = [limit, offset];

      client.query(fetchQuery, values, (err, newsResult) => {
        if (!err) {
          const newsSend = newsResult.rows.map(row => ({
            ...row,
            date: parseDate(row.date),
          }));
          return res.status(200).send({ news: newsSend, totalCount: rowCount });
        } else {
          console.error(err.message);
          return res.status(500).send('Грешка у бази!');
        }
      });
    });
  }

  public getNewsWithId(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    const query = 'SELECT * FROM news WHERE id=$1';
    const values = [id];
    client.query(query, values, (err, news) => {
      if (!err) {
        const newsSend = news.rows.map(row => ({
          ...row,
          date: parseDate(row.date)
        }));
        return res.status(200).send(newsSend);
      } else {
        return res.status(500).send('Грешка у бази!');
      }
    });
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

      console.log({ title, elements, headerValues, textValues });

      // Process the data as needed (e.g., store in the database)

      res.status(200).send('News uploaded successfully');
    });
  }

  public deleteNews(req: Request, res: Response): void {
    // Implement delete logic
  }

  public updateNews(req: Request, res: Response): void {
    // Implement update logic
  }
}
