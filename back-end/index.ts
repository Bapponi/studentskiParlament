import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import client from './database';
import linkRouter from './routes/LinkRouter';

const port = 8000;
const app: Express = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

client.connect();

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

// Middleware to serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// File upload route
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileData = {
    logo: 'http://localhost:8000/uploads/' + req.file.filename,
    website: req.body.website,
    name: req.body.name,
  };

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

app.use('/link', linkRouter); // Register the router here

app.listen(port, () => {
  console.log('Server running at port:', port);
});
