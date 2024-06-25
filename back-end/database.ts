import {Client} from 'pg';

const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "sifra123",
    database: "parliament",
    port: 5432
})

export default client