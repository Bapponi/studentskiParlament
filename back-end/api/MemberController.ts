import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';
import fs, { link } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'your_secret_key';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/members/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

const convertKeysToCamelCase = <T extends Record<string, any>>(obj: T): Record<string, any> => {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[toCamelCase(key)] = obj[key];
    }
  }
  return newObj;
};

export class MemberController {

    public getAllMembers(req: Request, res: Response): void {
        const roleId = parseInt(req.params.roleId);

        const query = 'SELECT * FROM members WHERE role_id = $1';
        const values = [roleId]

        client.query(query, values, (err, members) => {
            if (!err) {
                const camelCaseLinks = members.rows.map(convertKeysToCamelCase);
                res.status(200).send(camelCaseLinks);
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
    
            const roleId = parseInt(req.body.roleId);
    
            if (!req.file && roleId == 1) {
                return res.status(400).send('Није послат лого!');
            }
    
            const memberImg = req.file ? 'http://localhost:8000/uploads/members/' + req.file.filename : null;
            const bio = req.body.bio ? req.body.bio : null;
    
            const fileData = {
                memberImg: memberImg,
                name: req.body.name,
                position: req.body.position,
                bio: bio,
                roleId: roleId,
            };

            console.log(fileData)
    
            if (roleId == 3 && (fileData.position === "" || fileData.name === "")) {
                return res.status(400).send('Потребно је да се унесу и име и позиција члана!');
            }
    
            if (roleId == 1 && (fileData.position === "" || fileData.name === "" || fileData.bio === "")) {
                return res.status(400).send('Потребно је да се унесу и име, позиција и биографија члана!');
            }
    
            const query = 'INSERT INTO members (name, position, bio, member_img, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [fileData.name, fileData.position, fileData.bio, fileData.memberImg, fileData.roleId];
    
            client.query(query, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Greška u bazi!');
                } else {
                    const camelCaseLinks = result.rows.map(convertKeysToCamelCase);
                    return res.status(201).send(camelCaseLinks[0]);
                }
            });
        });
    }

    public deleteMember(req: Request, res: Response): void {
        const id = parseInt(req.params.id);
        const selectQuery = 'SELECT member_img, role_id FROM members WHERE id = $1';
        client.query(selectQuery, [id], (err, result) => {

            if (err) {
                console.error(err.message);
                return res.status(500).send('Грешка у бази!');
            }

            if (result.rows.length === 0 && result.rows[0].role_id == 1) {
                return res.status(404).send('Слика није пронађена!');
            }

            if(result.rows[0].member_img == undefined){
                const deleteQuery = 'DELETE FROM members WHERE id = $1 RETURNING *';
                client.query(deleteQuery, [id], (err, result) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).send('Грешка у бази!');
                    }
                    res.status(200).json(result.rows[0]);
                });
            }else{
                const filePath = result.rows[0].member_img;
                const fileToDelete = path.join(__dirname, '..', '..', 'uploads/members', path.basename(filePath));
                fs.unlink(fileToDelete, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                        return res.status(500).send('Грешка приликом брисанја слике!');
                    }

                    const deleteQuery = 'DELETE FROM members WHERE id = $1 RETURNING *';
                    client.query(deleteQuery, [id], (err, result) => {
                        if (err) {
                            console.error(err.message);
                            return res.status(500).send('Грешка у бази!');
                        }
                        res.status(200).json(result.rows[0]);
                    });
                });
            }            
        });
    }

    public updateMember(req: Request, res: Response): void {
        
        upload.single('file')(req, res, (err) => {
            if (err) {
                return res.status(400).send('Није успело са сланјем логоа!');
            }
    
            const roleId = parseInt(req.body.roleId);
            const memberImg = req.file ? 'http://localhost:8000/uploads/members/' + req.file.filename : null;
    
            const fileData = {
                memberImg: memberImg,
                name: req.body.name,
                position: req.body.position,
                bio: req.body.bio,
                roleId: roleId,
            };

            console.log(fileData)

            const id = parseInt(req.params.id);

            if (fileData.roleId == 3 && (fileData.position == "" || fileData.name == "")) {
                return res.status(400).send('Потребно постоје и име и позиција члана!');
            }
            
            if (fileData.roleId == 1 && (fileData.position == "" || fileData.name == "" || fileData.bio == "")) {
                return res.status(400).send('Потребно је да постоје и име, позиција и биографија члана!');
            }

            let query, values
            
            if(fileData.memberImg == undefined){
                query = 'UPDATE members SET name = $1, position = $2, bio = $3, role_id = $4 WHERE id = $5 RETURNING *';
                values = [fileData.name, fileData.position, fileData.bio, fileData.roleId, id];
            }else{
                query = 'UPDATE members SET name = $1, position = $2, bio = $3, member_img = $4, role_id = $5 WHERE id = $6 RETURNING *';
                values = [fileData.name, fileData.position, fileData.bio, fileData.memberImg, fileData.roleId, id];
            }

            client.query(query, values, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Грешка у бази!');
                }else{
                    const camelCaseLinks = result.rows.map(convertKeysToCamelCase);
                    return res.status(201).send(camelCaseLinks[0]);
                }
            });
        });
    }

    public loginMember(req: Request, res: Response) {

        const { username, password } = req.body;

        const query = 'SELECT * FROM members WHERE username = $1 AND password = $2';
        const values = [username, password]

        client.query(query, values, (err, member) => {
            if (!err) {

                if (member.rows.length === 0) {
                    return res.status(400).send('Нетачни креденцијали!');
                }
            
                const user = member.rows[0];
                const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            
                return res.json({token: token, userId: user.id, userRole: user.role_id});
            } else {
                return res.status(500).send('Грешка у бази!');
            }
        });
    };

}
