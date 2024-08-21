import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
require('dotenv').config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/links/');
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
                return res.status(500).send('Грешка у бази!');
            }
        });
    }

    public createLink(req: Request, res: Response): void {
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).send('Није успело са сланјем логоа!');
            }

            if (!req.file) {
                return res.status(400).send('Није послат лого!');
            }

            const fileData = {
                logo: `${process.env.DB_BACKEND_LINK}/uploads/links/${req.file.filename}`,
                website: req.body.website,
                name: req.body.name,
            };

            if (fileData.website == "" || fileData.name == "") {
                return res.status(400).send('Потребно је да се унесу и сајт и име!');
            }

            const urlPattern = /^(http:\/\/|https:\/\/).+/;

            if (!urlPattern.test(fileData.website)) {
                return res.status(400).send('Сајт мора почети са http:// или са https://');
            }

            const query = 'INSERT INTO links (logo, website, name) VALUES ($1, $2, $3) RETURNING *';
            const values = [fileData.logo, fileData.website, fileData.name];

            client.query(query, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Greška u bazi!');
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
                return res.status(500).send('Грешка у бази!');
            }

            if (result.rows.length === 0) {
                return res.status(404).send('Линк није пронађен!');
            }

            const filePath = result.rows[0].logo;

            const fileToDelete = path.join(__dirname, '..', '..', 'uploads/links', path.basename(filePath));
            fs.unlink(fileToDelete, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return res.status(500).send('Грешка приликом брисанја логоа!');
                }

                // Delete the link from the database
                const deleteQuery = 'DELETE FROM links WHERE id = $1 RETURNING *';
                client.query(deleteQuery, [id], (err, result) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).send('Грешка у бази!');
                    }
                    res.status(200).json(result.rows[0]);
                });
            });
        });
    }

    public updateLink(req: Request, res: Response): void {
        
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).send('Није успело каченје фајла!');
            }

            const logo = req.file ? 'http://localhost:8000/uploads/links/' + req.file.filename : null;

            const fileData = {
                logo: logo,
                website: req.body.website,
                name: req.body.name,
            };
            const id = parseInt(req.params.id);

            if (fileData.website == "" || fileData.name == "") {
                return res.status(400).send('Потребно је да се унесу и сајт и име!');
            }

            const urlPattern = /^(http:\/\/|https:\/\/).+/;

            if (!urlPattern.test(fileData.website)) {
                return res.status(400).send('Сајт мора почети са http:// или са https://');
            }

            let query = 'UPDATE links SET website = $1, name = $2, logo = $3 WHERE id = $4 RETURNING *';
            let values = [fileData.website, fileData.name, fileData.logo, id];
            
            if(logo == null){
                query = 'UPDATE links SET website = $1, name = $2 WHERE id = $3 RETURNING *';
                values = [fileData.website, fileData.name, id];
            }

            client.query(query, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Грешка у бази!');
                }
                res.status(201).json(result.rows[0]);
            });
        });
    }
}
