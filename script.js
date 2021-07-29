const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//CONTROLLERS
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const increment = require('./controllers/increment');
const profile = require('./controllers/profile');

//Db connection
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'face-recognition'
  }
});

app.use(express.json());
app.use(cors());


//SIGNIN
app.post('/signin', signin.handleSignIn(db,bcrypt))


//REGISTER
app.post('/register', register.handleRegister(db,bcrypt))


//INCREMENTING ENTRIES
app.put('/image', increment.handleIncrement(db))


//Getting profile
app.get('/profile/:id', profile.handleProfile(db))




app.listen(3000, ()=>{
	console.log("App is running on port 3000");
})