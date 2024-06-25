import express, {Express, Request, Response} from 'express'

const port = 8000

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.send("YEP IN + T")
})

app.get("/h1", (req: Request, res: Response) => {
    res.send("HIIIIIIIIasadasdasdawfawdad")
})

app.listen(port, () => {
    console.log("Server running at port: " + port)
})