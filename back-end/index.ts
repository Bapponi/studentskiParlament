import express, { Express } from 'express';
import cors from 'cors';
import client from './database';
import linkRouter from './routes/LinkRouter';

const port = 8000;
const app: Express = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

client.connect();

// Middleware to serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.use('/link', linkRouter); // Register the router here

app.listen(port, () => {
  console.log('Server running at port:', port);
});
