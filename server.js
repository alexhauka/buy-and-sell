// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || 'development';
const express       = require('express');
const bodyParser    = require('body-parser');
const sass          = require('node-sass-middleware');
const app           = express();
const cookieSession = require('cookie-session');
const morgan        = require('morgan');

//NOTE: database is in /lib/db.js and used modularly by /routes files via queries /lib


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

// Separated Routes for each Resource
const itemsRoutes  = require('./routes/items');
const loginRoutes  = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const searchRoutes = require('./routes/search');
const usersRoutes  = require('./routes/users');


// mounted resource routes
app.use('/items', itemsRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/search', searchRoutes);
app.use('/users', usersRoutes);

// !!!!----- first page ejs is disabled now ------!!!!!
// Home page
// app.get('/', (req, res) => {
//   res.render('index');
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
