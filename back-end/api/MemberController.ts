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

export class MemberController {

    public getAllMembers(req: Request, res: Response): void {
        client.query('SELECT * FROM members', (err, links) => {
            if (!err) {
                res.status(200).send(links.rows);
            } else {
                return res.status(500).send('Грешка у бази!');
            }
        });
    }

    public uploadMemberFile(req: Request, res: Response): void {
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).send('Није успело са сланјем логоа!');
            }

            if (!req.file) {
                return res.status(400).send('Није послат лого!');
            }

            const fileData = {
                memberImg: 'http://localhost:8000/uploads/members/' + req.file.filename,
                name: req.body.name,
                position: req.body.position,
                bio: req.body.bio,
                roleId: req.body.roleId,
            };

            if (fileData.roleId = 3 && (fileData.position == "" || fileData.name == "")) {
                return res.status(400).send('Потребно је да се унесу и име и позиција члана!');
            }
            //promeniti ovo
            if (fileData.roleId = 1 && (fileData.position == "" || fileData.name == "" || fileData.bio == "")) {
                return res.status(400).send('Потребно је да се унесу и име, позиција и биографија члана!');
            }

            const query = 'INSERT INTO members (name, position, bio, member_img, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [fileData.name, fileData.position, fileData.bio, fileData.memberImg, fileData.roleId];

            client.query(query, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Greška u bazi!');
                }
                res.status(201).json(result.rows[0]);
            });
        });
    }

    public deleteMember(req: Request, res: Response): void {
        const id = parseInt(req.params.id);

        const selectQuery = 'SELECT member_img FROM members WHERE id = $1';
        client.query(selectQuery, [id], (err, result) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Грешка у бази!');
            }

            if (result.rows.length === 0) {
                return res.status(404).send('Слика није пронађена!');
            }

            const filePath = result.rows[0].logo;

            const fileToDelete = path.join(__dirname, '..', '..', 'uploads/members', path.basename(filePath));
            fs.unlink(fileToDelete, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return res.status(500).send('Грешка приликом брисанја слике!');
                }

                // Delete the link from the database
                const deleteQuery = 'DELETE FROM members WHERE id = $1 RETURNING *';
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

    public updateMember(req: Request, res: Response): void {
        
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).send('Није успело каченје слике!');
            }

            if (!req.file) {
                return res.status(400).send('Није окачена слика!');
            }

            const fileData = {
                memberImg: 'http://localhost:8000/uploads/members/' + req.file.filename,
                name: req.body.name,
                position: req.body.position,
                bio: req.body.bio,
                roleId: req.body.roleId
            };
            const id = parseInt(req.params.id);

            if (fileData.roleId = 3 && (fileData.position == "" || fileData.name == "")) {
                return res.status(400).send('Потребно је да се унесу и име и позиција члана!');
            }
            //promeniti ovo
            if (fileData.roleId = 1 && (fileData.position == "" || fileData.name == "" || fileData.bio == "")) {
                return res.status(400).send('Потребно је да се унесу и име, позиција и биографија члана!');
            }

            const query = 'UPDATE members SET name = $1, position = $2, bio = $3, member_img = $4, role_id = $5 WHERE id = $6 RETURNING *';
            const values = [fileData.name, fileData.name, fileData.bio, fileData.memberImg, fileData.roleId, id];

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
