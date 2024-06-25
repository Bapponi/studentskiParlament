import {Client} from 'pg';

const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "sifra123",
    database: "parliament",
    port: 5432
})

client.connect();

client.query('SELECT * FROM test', (err, res) =>{
    if(!err){
        console.log(res.rows)
    }else{
        console.log(err.message)
    }
    client.end;
})