import express, {Express, Request, Response} from 'express'
import client from './database'

const port = 8000

const app = express()
app.use(express.json({limit: '10mb'}));
client.connect();

app.get("/", (req: Request, res1: Response) => {
    
    client.query('SELECT * FROM test', (err, res) =>{
        if(!err){
            console.log(res.rows)
            res1.status(200).send(res.rows)
        }else{
            console.log(err.message)
        }
    })
})

app.get("/test", (req: Request, res: Response) => {
    res.send("HIIIIIIIIasadasdasdawfawdad")
})

app.listen(port, () => {
    console.log("Server running at port: " + port)
})

client.end;