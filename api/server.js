const express = require('express');        // server framework
const mongoose = require('mongoose');      // mongoDB object modeling
const bodyParser = require('body-parser'); // handle html forms
const app = express();                     // instantiate express into app variable
const router = express.Router();           // router
const passport = require("passport");      // authentication strategies
const bearerToken = require("express-bearer-token"); // express json web token middleware

const Config = require('./config.js');     // api configuration
const port = 3001;                         // port the app will run on

// testing middleware modules
// const Validation = require('./modules/Validation');
// const Keymaster = require('./modules/Keymaster');



/***********************/
/* Connect To Database */
/***********************/
mongoose.Promise = global.Promise; // sets mongoose promise to use node native promise

let dbConnectionString = `mongodb://${Config.db.username}:${Config.db.password}@${Config.db.URI}`;

app.use(bodyParser.urlencoded({ extended: true })); // handle url encoded forms
app.use(bodyParser.json()); // handle json response
app.use(bearerToken()); // extracts bearer token from request
  
const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  family: 4,  
  keepAlive: 1, 
  connectTimeoutMS: 30000
};

mongoose.connect(
  dbConnectionString,
  dbOptions
, (error) => {
  if (error) {
    console.log('There was a problem connecting to the db.');
  } else {
    console.log('Connection to db successful.');
  }
});



/***********************/
/* Authentication      */
/***********************/

// instantiate passport
app.use(passport.initialize());

// set passport login and signup strategies
const localSignupStrategy = require("./passport/local-signup");
const localLoginStrategy = require("./passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);


/***********************/
/* CORS                */
/***********************/

// set cross origin resource sharing (CORS) policy
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, HEAD, OPTIONS, POST, PUT, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Authorization, Origin, Accept, X-Requested-With, Content-Type, X-Access-Token"
  );
  res.header("Cache-Control", "no-cache");
  next();
});



/***********************/
/* Routes              */
/***********************/

require('./routes/static.js')(router); // static info routes
require('./routes/auth.js')(router, passport);   // user authentication routes
require('./routes/models.js')(router); // all model routes

app.use('/api/v1', router); // prepend all routes with /api/v1/



/***********************/
/* Listen              */
/***********************/
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

