require("dotenv").config();

const express = require("express");
const methodOverride = require('method-override');
const expressLayout = require("express-ejs-layouts");
const {flash} = require('express-flash-message');
const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const PORT = process.env.PORT || 8000;

//connect Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); 


//static files
app.use(express.static('public'));

//Express session
app.use(
     session({
          secret: 'wadaad',
          resave: false,
          saveUninitialized: true,
          cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7, // one week  
          }
     })
);


//Flash Message
app.use(flash({ sessionKeyName: 'flashMessage' }));



//template engine
app.use(expressLayout);
app.set('layout', './layouts/main' );
app.set('view engine', 'ejs');

//routes
app.use('/', require('./server/routes/customer'));


//handle 404
app.get('*', (req, res)=>{
 res.status(404).render('404');
});

//listen
app.listen(PORT, ()=>{
 console.log(`Server is listening on port ${PORT}`);
})