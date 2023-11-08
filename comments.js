//Create web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

//Create database connection
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});

//Connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

//Set static path for express
app.use(express.static(path.join(__dirname, 'public')));

//Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set up route for get request
app.get('/comments', (req, res) => {
    let sql = 'SELECT * FROM comments';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//Set up route for post request
app.post('/comments', (req, res) => {
    let comment = {comment: req.body.comment};
    let sql = 'INSERT INTO comments SET ?';
    db.query(sql, comment, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
});

//Set up route for delete request
app.delete('/comments/:id', (req, res) => {
    let sql = `DELETE FROM comments WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.sendStatus(200);
    });
});

//Set up route for put request
app.put('/comments/:id', (req, res) => {
    let sql = `UPDATE comments SET comment = '${req.body.comment}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.sendStatus(200);
    });
});

//Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});