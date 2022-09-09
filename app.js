const express = require('express');
const mysql = require('mysql');
const app = express();

// go to views file
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

// MySQL CONNECTION


var con = mysql.createConnection({
    host: "localhost",
    database:'mydb',
    user: "root",
    password: "root"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


// END OF MYSQL CONNECTNION


// req => request 
// res => respond

app.get('/', function(req,res) {

    var query = `SELECT * FROM STUDENTS`;

   con.query(query, function(err,result) {

    if(err)
        res.send(err);

    else
        res.render('index', {students:result});

   })

})




app.listen(3000, function() {
    console.log('SERVER STARTED ON PORT 1000');

    


})