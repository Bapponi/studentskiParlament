import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

interface NewsSection{
  type: string,
  content: string,
}

interface News{
  id: number,
  title: string,
  banner: string,
  clip: string,
  date: string,
  newsSection: NewsSection[],
}

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

interface UploadedFiles {
  [fieldname: string]: Express.Multer.File[];
}

interface MulterRequest extends Request {
  files: UploadedFiles;
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
    const query = 'SELECT * FROM news INNER JOIN news_sections ON news.id = news_sections.news_id WHERE news.id = $1 ORDER BY news_sections.ordering;';
    const values = [id];
    client.query(query, values, (err, result) => { //sredi ovo kasnije i najbolje da ide iz 2 query-ja
      if (!err) {

        let news: News | null = null;

        news = {
          id: result.rows[0].news_id,
          title: result.rows[0].title,
          banner: result.rows[0].banner,
          clip: result.rows[0].clip,
          date: parseDate(result.rows[0].date),
          newsSection: []
        };

        result.rows.forEach((row)=>{

          if (news) {
            news.newsSection.push({
              type: row.type,
              content: row.content,
            });
          }
        })
        
        return res.status(200).send(news);
      } else {
        return res.status(500).send('Грешка у бази!');
      }
    });
  }

  public uploadNewsFile = async (req: Request, res: Response) => {
    const multerUpload = upload.fields([
      { name: 'banner', maxCount: 1 },
      { name: 'uploadedFiles', maxCount: 10 },
    ]);
  
    // Wrap the multer upload in a promise
    const handleFileUpload = (): Promise<UploadedFiles> => {
      return new Promise((resolve, reject) => {
        multerUpload(req, res, (err) => {
          if (err) {
            return reject(new Error('File upload error'));
          }
          resolve(req.files as UploadedFiles);
        });
      });
    };
  
    try {
      const files = await handleFileUpload();
  
      const uploadedFiles = files['uploadedFiles'] || [];
      const banner = files['banner'] ? files['banner'][0] : undefined;
      const bannerName = banner ? 'http://localhost:8000/uploads/news/' + banner.filename : null;
  
      const title = req.body.title;
      const elements = JSON.parse(req.body.elements);
      const headerValues = JSON.parse(req.body.headerValues);
      const textValues = JSON.parse(req.body.textValues);
      const fileKeys = req.body.uploadedFileKeys
  
      console.log({ title, banner, elements, headerValues, textValues, uploadedFiles, fileKeys });
      const clip = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit inventore odio nam aliquid tenetur reprehenderit facere voluptate nesciunt laudantium consequuntur maxime, autem magnam omnis hic officiis quisquam at esse labore.'
  
      let mainQuery: string;
      let values: any[];
  
      if (banner == undefined) {
        mainQuery = 'INSERT INTO news (title, clip) VALUES($1, $2) RETURNING id';
        values = [title, clip];
      } else {
        mainQuery = 'INSERT INTO news (title, clip, banner) VALUES($1, $2, $3) RETURNING id';
        values = [title, clip, bannerName];
      }
  
      const newsInsertResult = await client.query(mainQuery, values);
      const newsId = newsInsertResult.rows[0].id;

      const selectQuery = 'INSERT INTO news_sections (type, content, ordering, news_id) VALUES($1, $2, $3, $4)';
      if(headerValues){
        
        Object.entries(headerValues).forEach(([key, value]) => {
          const values = ['header', value, key, newsId]
          client.query(selectQuery, values);
        });
      }

      if(textValues){
        Object.entries(textValues).forEach(([key, value]) => {
          const values = ['text', value, key, newsId]
          client.query(selectQuery, values);
        });
      }

      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach((file, index) => {
          const pictureName = 'http://localhost:8000/uploads/news/' + file.filename;
          const sectionValues = ['picture', pictureName, fileKeys[index], newsId];
          client.query(selectQuery, sectionValues);
        });
      }
  
      res.status(200).json('Успешно окачена вест');
    } catch (error) {
      console.error(error);
      res.status(500).send('Грешка у бази!');
    }
  };

  public deleteNews(req: Request, res: Response): void {
    // Implement delete logic
  }

  public updateNews(req: Request, res: Response): void {
    // Implement update logic
  }
}
