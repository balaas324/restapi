const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const mysql = require('mysql');

const PORT = 3000

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users"
})

con.connect((err)=>{
    if (err) throw err;
    console.log('connected');
    /*
    const sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(255), lastName VARCHAR(255), address VARCHAR(255))"
    con.query(sql, (err, res)=>{
        if (err) throw err;
        console.log('table created');
    })*/
    
})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`server is running on port http://localhost${PORT}`);
})

app.get("/users", (req, res)=>{
    con.query('select * from users', (err,rows,fields)=>{
        if (err) throw err;
        res.send(rows)
    })
})

app.get("/users/:id", (req, res)=>{
    con.query('select * from users where id = ?', [req.params.id], (err, rows, fields)=>{
        if (err) throw err;
        res.send(rows);
    })
})

app.delete("/users/:id", (req, res)=>{
    con.query('delete from users where id = ?', [req.params.id], (err, rows, fileds)=>{
        if (err) throw err;
        res.send('user deleted from table')
    })
})

app.post("/users", (req, res)=>{
    const insertSql = "insert into users (firstName, lastName, address) values ?"
    let values = [req.body]
    con.query(insertSql, values, (err, res, fields)=>{
        if (err) throw err;
        console.log(res);
    })
})

app.put('/users', (req, res)=>{
    const updateSql = "update users set firstName = ?, set lastName = ?, set address = ? where id = ?"
    let values = [req.body];
    con.query(updateSql, values, (err, res, fields)=>{
        if (err) throw err
        console.log(res);
    })
})