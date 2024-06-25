import express, {Express, Request, Response} from 'express'
import client from './database'

const port = 8000

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send("YEP IN + T")
    
    client.connect();
    client.query('SELECT * FROM test', (err, res) =>{
        if(!err){
            console.log(res.rows)
        }else{
            console.log(err.message)
        }
        client.end;
    })
})

app.get("/test", (req: Request, res: Response) => {
    res.send("HIIIIIIIIasadasdasdawfawdad")
})

app.listen(port, () => {
    console.log("Server running at port: " + port)
})