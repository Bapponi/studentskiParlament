import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
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

    public deleteLink(req: Request, res: Response): void {
        const id = parseInt(req.params.id);

        const selectQuery = 'SELECT logo FROM links WHERE id = $1';
        client.query(selectQuery, [id], (err, result) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Database error.');
            }

            if (result.rows.length === 0) {
                return res.status(404).send('Link not found.');
            }

            const filePath = result.rows[0].logo;

            const fileToDelete = path.join(__dirname, '..', '..', 'uploads', path.basename(filePath));
            fs.unlink(fileToDelete, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return res.status(500).send('File deletion error.');
                }

                // Delete the link from the database
                const deleteQuery = 'DELETE FROM links WHERE id = $1 RETURNING *';
                client.query(deleteQuery, [id], (err, result) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).send('Database error.');
                    }
                    res.status(200).json(result.rows[0]);
                });
            });
        });
    }

    public updateLink(req: Request, res: Response): void {
        
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
            const id = parseInt(req.params.id);

            if (!fileData.website || !fileData.name) {
                return res.status(400).send('Website and name are required.');
            }

            const query = 'UPDATE links SET website = $1, name = $2, logo = $3 WHERE id = $4 RETURNING *';
            const values = [fileData.website, fileData.name, fileData.logo, id];

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
