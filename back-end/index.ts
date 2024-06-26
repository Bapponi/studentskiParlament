import express, { Express, Request, Response } from 'express';
import client from './database';
import linkRouter from './routes/LinkRouter';

const port = 8000;
const app: Express = express();

app.use(express.json({ limit: '10mb' }));

client.connect();

app.use('/link', linkRouter); // Register the router here

app.get("/", (req: Request, res1: Response) => {
    client.query('SELECT * FROM test', (err, res) => {
        if (!err) {
            console.log(res.rows);
            res1.status(200).send(res.rows);
        } else {
            console.log(err.message);
        }
    });
});

app.get("/test", (req: Request, res: Response) => {
    res.send("HIIIIIIIIasadasdasdawfawdad");
});

app.listen(port, () => {
    console.log("Server running at port: " + port);
});

// Do not call client.end here because it will close the connection immediately after starting the server
