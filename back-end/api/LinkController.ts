import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';

// Setup Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

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

    public uploadLinkFile(req: Request, res: Response): void {
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).send('File upload failed.');
            }

            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }

            const fileData = {
                logo: 'http://localhost:8000/uploads/' + req.file.filename,
                website: req.body.website,
                name: req.body.name,
            };

            if (!fileData.website || !fileData.name) {
                return res.status(400).send('Website and name are required.');
            }

            // Insert file metadata into the database
            const query = 'INSERT INTO links (logo, website, name) VALUES ($1, $2, $3) RETURNING *';
            const values = [fileData.logo, fileData.website, fileData.name];

            client.query(query, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Database error.');
                }
                res.status(201).json(result.rows[0]);
            });
        });
    }
}
