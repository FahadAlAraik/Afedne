const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const app = express();
var userName = '';
// go to views file
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );
app.use(bodyParser.urlencoded({extended:true}));
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

   res.render('index', {userName:userName,loggedOut:false})

})

app.get('/exam', function(req,res) {


  res.render('exam', {userName:userName})


})

app.get('/signin', function(req,res) {

  res.render('signin', {success:false,err:false})

})

app.post('/signin',function(req,res) {


  var email = req.body.email
  var pass = req.body.password
  console.log(email,pass)
  var query = `select * from users where email like '${email}' and password='${pass}' `;

  con.query(query, function(err,result) {

    if(err)
      console.log(err);

    else {

      if(result.length != 0){
        userName =result[0].name;
        res.render('index', {userName:userName,loggedOut:false})
      
      }
      else  res.render('signin',{success:false,err:true})

      
    }


  })
  

  

})

app.get('/signout', function(req,res) {

  userName='';
  res.render('index', {userName:userName, loggedOut:true})

})

app.get('/signup', function(req,res) {


  res.render('signup', {err:''})


})

app.post('/signup', function(req,res) {


  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.password;
  var confirmPass = req.body.password2;

  if(pass != confirmPass) {
    res.render('signup', {err:'كلمة السر وتأكيد كلمة السر لا يتشابهان!!'})
  }

  else {


    let query = `SELECT * FROM users where email like '${email}'`;
    con.query(query,function(err,result) {

      if(err)
        console.log(err)

      else{

        if(result.length != 0)
          res.render('signup', {err:'يوجد بريد الكتروني بنفس الاسم في قاعدة البيانات!!'})

        else {

          query = `INSERT INTO users values ('${email}','${pass}','${name}')`
          con.query(query,function(err,result) {

            if(err)
              console.log(err)

            else 
              res.render('signin',{success:true,err:false})


          })

        }

      }


    })


  }


})

app.get("/about", function(req,res){
  res.render('aboutus', {userName:userName})
})

app.get('/roadmaps',function(req,res) {
  res.render('roadmaps', {userName:userName})
})

app.get('/fields', function(req,res) {
  res.render('fields', {userName:userName})
})


app.listen(3000, function() {
    console.log('SERVER STARTED ON PORT 3000');

    


})