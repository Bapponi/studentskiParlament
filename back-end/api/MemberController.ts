import { Request, Response } from 'express';
import client from '../database';
import multer from 'multer';
import fs, { link } from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';  // Make sure to import crypto
import { sendEmail } from '../utils/EmailService'; // Make sure to imp

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

    public getMemberName(req: Request, res: Response): void {
        
        const id = parseInt(req.params.userId);

        const query = 'SELECT name FROM members WHERE id = $1';
        const values = [id]

        client.query(query, values, (err, member) => {
            if (!err) {
                res.status(200).json(member.rows[0].name);
            } else {
                return res.status(500).send('Грешка у бази!');
            }
        });
    }

    private validateEmail(email: string): boolean {
        const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
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
                email: req.body.email,
                position: req.body.position,
                bio: bio,
                roleId: roleId,
            };

            if(!this.validateEmail(fileData.email)){
                return res.status(400).send('Лоше форматиран мејл!');
            }
    
            if (roleId == 3 && (fileData.position === "" || fileData.name === "")) {
                return res.status(400).send('Потребно је да се унесу и име и позиција члана!');
            }
    
            if (roleId == 1 && (fileData.position === "" || fileData.name === "" || fileData.bio === "")) {
                return res.status(400).send('Потребно је да се унесу и име, позиција и биографија члана!');
            }
    
            const query = 'INSERT INTO members (name, email, position, bio, member_img, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const values = [fileData.name, fileData.email, fileData.position, fileData.bio, fileData.memberImg, fileData.roleId];
    
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
                email: req.body.email,
                position: req.body.position,
                bio: req.body.bio,
                roleId: roleId,
            };

            const id = parseInt(req.params.id);

            if(!this.validateEmail(fileData.email)){
                return res.status(400).send('Лоше форматиран мејл!');
            }

            if (fileData.roleId == 3 && (fileData.position == "" || fileData.name == "")) {
                return res.status(400).send('Потребно постоје и име и позиција члана!');
            }
            
            if (fileData.roleId == 1 && (fileData.position == "" || fileData.name == "" || fileData.bio == "")) {
                return res.status(400).send('Потребно је да постоје и име, позиција и биографија члана!');
            }

            let query, values
            
            if(fileData.memberImg == undefined){
                query = 'UPDATE members SET name = $1, email = $2, position = $3, bio = $4, role_id = $5 WHERE id = $6 RETURNING *';
                values = [fileData.name, fileData.email, fileData.position, fileData.bio, fileData.roleId, id];
            }else{
                query = 'UPDATE members SET name = $1, email = $2, position = $3, bio = $4, member_img = $5, role_id = $6 WHERE id = $7 RETURNING *';
                values = [fileData.name, fileData.email, fileData.position, fileData.bio, fileData.memberImg, fileData.roleId, id];
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

    public async loginMember(req: Request, res: Response) {
      const { email, password } = req.body;
      const query = 'SELECT * FROM members WHERE email = $1';
      const values = [email];
    
      try {
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
          return res.status(400).send('Нетачни креденцијали!');
        }
    
        const user = result.rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(400).send('Нетачни креденцијали!');
        }
    
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token: token, userId: user.id, userRole: user.role_id });
      } catch (err) {
        console.error(err);
        return res.status(500).send('Грешка у бази!');
      }
    }

    public async requestPasswordReset(req: Request, res: Response) {
      const { email } = req.body;
      const query = 'SELECT id FROM members WHERE email = $1';
      const values = [email];

      try {
        const result = await client.query(query, values);
        if (result.rows.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        const user = result.rows[0];
        const token = crypto.randomBytes(32).toString('hex');
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1); // Token valid for 1 hour

        await client.query('INSERT INTO password_reset_tokens (user_id, token, expiration) VALUES ($1, $2, $3)', [user.id, token, expiration]);

        const resetLink = `http://localhost:3000/new-password?token=${token}`;
        await sendEmail(email, 'Прављење нове шифре', `Кликни на овај линк како би поставио нову шифру у року од наредних сат времена: ${resetLink}`);

        res.status(200).json({ message: 'Грешка приликом слања мејла потврде' });
      } catch (err) {
        console.error(err);
        return res.status(500).send('Грешка у бази!');
      }
    }


    public async setNewPassword(req: Request, res: Response) {
      const { email, password1, password2, token } = req.body;

      if (password1 !== password2) {
        return res.status(400).json("Нису исте шифре!");
      }
    
      try {
        const tokenQuery = 'SELECT * FROM password_reset_tokens WHERE token = $1';
        const tokenValues = [token];
        const tokenResult = await client.query(tokenQuery, tokenValues);
    
        if (tokenResult.rows.length === 0 || new Date(tokenResult.rows[0].expiration) < new Date()) {
          return res.status(400).json("Прошло је време за постављање нове шифре");
        }
    
        const userId = tokenResult.rows[0].user_id;
    
        const userQuery = 'SELECT * FROM members WHERE id = $1 AND email = $2';
        const userValues = [userId, email];
        const userResult = await client.query(userQuery, userValues);
    
        if (userResult.rows.length === 0) {
          return res.status(404).json("Није нађен корисник са датим мејлом");
        }
    
        const hashedPassword = await bcrypt.hash(password1, 10);
    
        const updateQuery = 'UPDATE members SET password = $1 WHERE id = $2';
        const updateValues = [hashedPassword, userId];
        await client.query(updateQuery, updateValues);
    
        const deleteTokenQuery = 'DELETE FROM password_reset_tokens WHERE token = $1';
        await client.query(deleteTokenQuery, tokenValues);
    
        return res.status(200).json("Успешно постављена нова шифра");
      } catch (err) {
        console.error(err);
        return res.status(500).send('Грешка у бази!');
      }
    }

}
