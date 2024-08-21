import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';
require('dotenv').config();

interface NewsSection {
  id: number,
  type: string,
  content: string,
}

interface News {
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
  public upload = upload;

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

        result.rows.forEach((row) => {
          if (news) {
            news.newsSection.push({
              id: row.id,
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
        { name: 'uploadedVideo', maxCount: 10 }, // Add this line to handle video uploads
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
        const uploadedVideo = files['uploadedVideo'] || []; // Add this line to extract uploaded videos
        const banner = files['banner'] ? files['banner'][0] : undefined;
        const bannerName = banner ? 'http://localhost:8000/uploads/news/' + banner.filename : null;

        const title = req.body.title;
        const clip = req.body.clip;
        const elements = JSON.parse(req.body.elements);
        const headerValues = JSON.parse(req.body.headerValues);
        const textValues = JSON.parse(req.body.textValues);
        const fileKeys = req.body.uploadedFileKeys;
        const videoKeys = req.body.uploadedVideoKeys; // Add this line to get video keys

        if (clip.length > 200) {
            return res.status(300).send('Унет предугачки исечак текста!');
        }

        console.log({ title, clip, banner, elements, headerValues, textValues, uploadedFiles, uploadedVideo, fileKeys, videoKeys });

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
        if (headerValues) {
            Object.entries(headerValues).forEach(([key, value]) => {
                const values = ['header', value, key, newsId];
                client.query(selectQuery, values);
            });
        }

        if (textValues) {
            Object.entries(textValues).forEach(([key, value]) => {
                const values = ['text', value, key, newsId];
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

        if (uploadedVideo.length > 0) {
            uploadedVideo.forEach((file, index) => {
                const videoName = 'http://localhost:8000/uploads/news/' + file.filename;
                const sectionValues = ['video', videoName, videoKeys[index], newsId];
                client.query(selectQuery, sectionValues);
            });
        }

        res.status(200).json('Успешно окачена вест');
    } catch (error) {
        console.error(error);
        res.status(500).send('Грешка у бази!');
    }
  };


  public deleteNews = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    const deleteNewsSectionsQuery = 'DELETE FROM news_sections WHERE news_id = $1';
    const deleteNewsQuery = 'DELETE FROM news WHERE id = $1 RETURNING *';

    try {
      await client.query(deleteNewsSectionsQuery, [id]);
      const result = await client.query(deleteNewsQuery, [id]);

      if (result.rows.length === 0) {
        res.status(404).send('Није пронађенa вест');
      } else {
        res.status(200).json('Успешно избрисана вест');
      }
    } catch (err) {
      res.status(500).send('Грешка у бази!');
    }
  }

  public async updateTitle(req: Request, res: Response) {
    const { id } = req.params;
    const { title } = req.body;
    try {
      const query = 'UPDATE news SET title = $1 WHERE id = $2';
      const values = [title, id];
      const result = await client.query(query, values);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.json({ message: 'Title updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Грешка у бази!');
    }
  }

  public async updateClip(req: Request, res: Response) {
    const { id } = req.params;
    const { clip } = req.body;
    try {
      const query = 'UPDATE news SET clip = $1 WHERE id = $2';
      const values = [clip, id];
      const result = await client.query(query, values);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.json({ message: 'Clip updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Грешка у бази!');
    }
  }

  public async updateBanner(req: Request, res: Response) {
    const { id } = req.params;
    const banner = req.file; // Assuming file upload middleware is used
    if (!banner) {
      return res.status(400).send('Banner file is required');
    }
    try {
      const bannerName = 'http://localhost:8000/uploads/news/' + banner.filename;
      const query = 'UPDATE news SET banner = $1 WHERE id = $2';
      const values = [bannerName, id];
      const result = await client.query(query, values);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'News not found' });
      }
      res.json({ message: 'Banner updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Грешка у бази!');
    }
  }

  public updateNewsSection = async (req: Request, res: Response) => {
    console.log(req.body)
    const sectionId = parseInt(req.body.sectionId);
    const type = req.body.type;
    let content = req.body.content;

    if ((type === 'picture' || type === 'video') && req.file) {
      content = 'http://localhost:8000/uploads/news/' + req.file.filename;
    }

    try {
      const updateQuery = 'UPDATE news_sections SET content = $1 WHERE id = $2';
      const values = [content, sectionId];

      await client.query(updateQuery, values);

      res.status(200).send('News section updated successfully!');
    } catch (error) {
      console.error('Error updating news section:', error);
      res.status(500).send('Error updating news section');
    }
  };
}