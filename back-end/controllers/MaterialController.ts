import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { Material } from '../models/Material';
require('dotenv').config();

interface CustomRequest extends Request {
  fileValidationError?: string;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/materials/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req: CustomRequest, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      req.fileValidationError = 'Неисправан тип фајл податка!';
      cb(null, false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});
  

const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

const convertKeysToCamelCase = <T extends Record<string, any>>(obj: T): Material => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[toCamelCase(key)] = obj[key];
    }
  }
  return newObj as Material;
};

export class MaterialController {

    public getAllMaterials(req: Request, res: Response): void {
        client.query('SELECT * FROM materials ORDER BY id ASC', (err, links) => {
            if (!err) {
                const camelCaseLinks: Material[] = links.rows.map((row: any) => convertKeysToCamelCase(row));
                res.status(200).json(camelCaseLinks);
            } else {
                console.error("Database error:", err.message);
                res.status(500).send('Грешка у бази!');
            }
        });
    }

    public createMaterial(req: CustomRequest, res: Response): void {
        upload.single('file')(req, res, (err) => {
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError);
            }

            if (err) {
                return res.status(400).send('Није успело са сланјем фајла!');
            }

            if (!req.file) {
                return res.status(400).send('Није послат фајл!');
            }

            const fileData = {
                document_link: `${process.env.BASE_URL}/uploads/materials/${req.file.filename}`,
                title: req.body.title.trim(),
            };

            if (!fileData.title) {
                return res.status(400).send('Потребно је да се унесе име!');
            }

            const query = 'INSERT INTO materials (document_link, title) VALUES ($1, $2) RETURNING *';
            const values = [fileData.document_link, fileData.title];

            client.query(query, values, (err, result) => {
                if (err) {
                    return res.status(500).send('Грешка у бази!');
                } else {
                    const camelCaseLinks = result.rows.map((row: any) => convertKeysToCamelCase(row));
                    return res.status(201).json(camelCaseLinks[0]);
                }
            });
        });
    }

    public deleteMaterial(req: Request, res: Response): void {
        const id = parseInt(req.params.id);

        const selectQuery = 'SELECT document_link FROM materials WHERE id = $1';
        client.query(selectQuery, [id], (err, result) => {
            if (err) {
                return res.status(500).send('Грешка у бази!');
            }

            if (result.rows.length === 0) {
                return res.status(404).send('Материјал није пронађен!');
            }

            const filePath = result.rows[0].document_link;

            const fileToDelete = path.join(__dirname, '..', '..', 'uploads/materials', path.basename(filePath));
            fs.unlink(fileToDelete, (err) => {
                if (err) {
                    return res.status(500).send('Грешка приликом брисанја фајла!');
                }

                const deleteQuery = 'DELETE FROM materials WHERE id = $1 RETURNING *';
                client.query(deleteQuery, [id], (err, result) => {
                    if (err) {
                        return res.status(500).send('Грешка у бази!');
                    }
                    res.status(200).json(convertKeysToCamelCase(result.rows[0]));
                });
            });
        });
    }

    public updateMaterial(req: Request, res: Response): void {
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).send('Није успело качење фајла!');
            }

            const document_link = req.file ? `${process.env.BASE_URL}/uploads/materials/${req.file.filename}` : null;

            const fileData = {
                document_link: document_link,
                title: req.body.title.trim(),
            };
            const id = parseInt(req.params.id);

            if (!fileData.title) {
                return res.status(400).send('Потребно је да се унесе име!');
            }

            let query;
            let values;
            if (document_link != null) {
                query = 'UPDATE materials SET title = $1, document_link = $2 WHERE id = $3 RETURNING *';
                values = [fileData.title, fileData.document_link, id];
            } else {
                query = 'UPDATE materials SET title = $1 WHERE id = $2 RETURNING *';
                values = [fileData.title, id];
            }

            client.query(query, values, (err, result) => {
                if (err) {
                    return res.status(500).send('Грешка у бази!');
                } else {
                    const camelCaseLinks = result.rows.map((row: any) => convertKeysToCamelCase(row));
                    return res.status(200).json(camelCaseLinks[0]);
                }
            });
        });
    }
}
