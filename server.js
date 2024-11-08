require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const PORT = process.env.PORT || 3000;
const app = express();
const connectDB = require('./config/database');

// Express Settings
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.engine('html', ejs.__express);

// Public assets
app.use(express.static(path.join(__dirname, 'public'))); // site.com/test.txt
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))); // site.com/css/bootstrap.min.css
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))); // site.com/css/bootstrap.bundle.min.js

// Connect to Mongo DB
// --
connectDB();

// Form treatment
// -
app.use(express.urlencoded({extended: true}));

// Session management
// -
// Create session
app.use(session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true, 
    cookie: { secure: false }
}));

// app.use(security.isLogged);


// Router
app.use('/', require(path.join(__dirname, 'config/router')));

// Server Start
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`));