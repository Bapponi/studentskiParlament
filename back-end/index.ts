import express, { Express } from 'express';
import cors from 'cors';
import client from './database';
import linkRouter from './routes/LinkRouter';
import materialRouter from './routes/MaterialRouter';
import newsRouter from './routes/NewsRouter';
import memberRouter from './routes/MemberRouter';
import pollRouter from './routes/PollRouter';

const port = 8000;
const app: Express = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

client.connect();

app.use('/uploads', express.static('uploads'));

app.use('/link', linkRouter);
app.use('/material', materialRouter);
app.use('/news', newsRouter);
app.use('/member', memberRouter);
app.use('/poll', pollRouter);

app.listen(port, () => {
  console.log('Server running at port:', port);
});
