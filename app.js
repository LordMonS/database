const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');



const db = mysql.createConnection({
    user:'avnadmin',
    host:'database-1-database-001.a.aivencloud.com',
    password:'AVNS_Ro1Fi0uxIFN_I_AWzpX',
    database:'defaultdb',
    port:17004
});

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next()
})

app.use(cors());
app.use(express.json())

app.post('/save',(req,res)=>{
    const user = req.body.username;
    db.query('SELECT * FROM user WHERE user = ?',[user], (err, results)=>{
        if(results.length<=0){
            db.query('INSERT INTO user (user) VALUES (?)',[user], (err, r)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(r.insertId)
                    res.send({message:"berhasil"})
                }
            })
        }else{
            res.send({message:"Username Sudah Terdaftar"})
            console.log("Username Sudah Terdaftar")
        }
    })
    
})

app.listen(process.env.PORT || 3001, ()=>{
    console.log("Databasenya Jalan ${PORT}")
})