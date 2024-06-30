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

export class MaterialController {

    public getAllMaterials(req: Request, res: Response): void {
        client.query('SELECT * FROM materials', (err, links) => {
            if (!err) {
                res.status(200).send(links.rows);
            } else {
                return res.status(500).send('Грешка у бази!');
            }
        });
    }

    public uploadMaterialFile(req: Request, res: Response): void {
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).send('Није успело са сланјем фајла!');
            }

            if (!req.file) {
                return res.status(400).send('Није послат фајл!');
            }

            const fileData = {
                logo: 'http://localhost:8000/uploads/' + req.file.filename,
                name: req.body.name,
            };

            if (fileData.name == "") {
                return res.status(400).send('Потребно је да се унесе име!');
            }

            const query = 'INSERT INTO materials (file, name) VALUES ($1, $2) RETURNING *';
            const values = [fileData.logo, fileData.name];

            client.query(query, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Greška u bazi!');
                }
                res.status(201).json(result.rows[0]);
            });
        });
    }

    public deleteMaterial(req: Request, res: Response): void {
        const id = parseInt(req.params.id);

        const selectQuery = 'SELECT file FROM materials WHERE id = $1';
        client.query(selectQuery, [id], (err, result) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Грешка у бази!');
            }

            if (result.rows.length === 0) {
                return res.status(404).send('Материјал није пронађен!');
            }

            const filePath = result.rows[0].file;

            const fileToDelete = path.join(__dirname, '..', '..', 'uploads', path.basename(filePath));
            fs.unlink(fileToDelete, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return res.status(500).send('Грешка приликом брисанја фајла!');
                }

                // Delete the link from the database
                const deleteQuery = 'DELETE FROM materials WHERE id = $1 RETURNING *';
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

    public updateMaterial(req: Request, res: Response): void {
        
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).send('Није успело качење фајла!');
            }

            if (!req.file) {
                return res.status(400).send('Није окачен фајл!');
            }

            const fileData = {
                file: 'http://localhost:8000/uploads/' + req.file.filename,
                name: req.body.name,
            };
            const id = parseInt(req.params.id);

            if (fileData.name == "") {
                return res.status(400).send('Потребно је да се унесе име!');
            }

            const query = 'UPDATE links SET name = $1, logo = $2 WHERE id = $3 RETURNING *';
            const values = [fileData.name, fileData.file, id];

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
