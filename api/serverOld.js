const express = require('express'); // server framework
const bodyParser = require('body-parser'); // handle html forms
const app = express(); // instantiate express into app variable
const fs = require('fs'); // file system
const Dat = require('dat-node'); // dat p2p file system
const config = require('./config.json'); // dat-api configuration
const port = 3001; // port the app will run on

app.use(bodyParser.urlencoded({ extended: true })); // handle url encoded forms
app.use(bodyParser.json()); // handle json response

app.get('/', validate, (req, res) => {
  // did middleware produce any errors
  const hasErrors = res.locals.errors.length > 0;
  // set response
  const response = {
    message: 'Welcome to the dat-api',
    errors: res.locals.errors,
    keys: res.locals.keys
  };
  // return response in json
  res.json(response);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* Validation Middleware
/*
/*  1. Check ./storage
/*  2. Check ./storage/lab.json
/*  2. Check config.labKey
*/  
function validate(req, res, next) {
  // set variable to hold errors array
  res.locals.errors = [];
  // does the storage directory exist?
  const storeDirExists = fs.existsSync('./store');
  // if the storage directory does not exist, create it
  if (!storeDirExists) { 
    // log directory creation
    console.log('creating ./store');
    // create directory
    fs.mkdirSync('./store'); 
  }
  // does the lab file exist?
  const labFileExists = fs.existsSync('./store/lab.json');
  // if the lab file does not exist, create it
  if (!labFileExists) { 
    // create lab object
    let labObj = {
      name: "Example Lab",
      description: "This is an example Lab.",
      country: "United States",
      region: "California"
    };
    // log file creation
    console.log('creating ./store/lab.json');
    // write the lab object to lab.json
    fs.writeFileSync('./store/lab.json', JSON.stringify(labObj, null, 2));
  }
  // require lab
  let lab = require('./store/lab.json');
  // does the lab key exist?
  const labKeyExists = config.labKey.length > 0;
  // if the lab key does not exist
  if (!labKeyExists) { 
    // create dat with ./store
    Dat('./store', function (err, dat) {
      // import the files from ./store
      dat.importFiles('./store', (err) => {
        // log files imported
        console.log(`files imported from ./store`);
        // share files on network
        dat.joinNetwork((err) => {  
          // log network joined
          console.log('p2p network joined');
          // get lab dat key
          let labKey = dat.key.toString('hex');
          // set lab key
          config.labKey = labKey;
          // log updated file
          console.log(`Adding labKey: ${labKey} to ./config.json`);
          // save updated labKey to config file
          fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
          // set labKey to response
          res.locals.keys = {
            lab: labKey
          };
          // proceed
          next();          
        });
      });
    });
  // else if the lab key does exist  
  } else {
    // set labKey to response
    res.locals.keys = {
      lab: config.labKey
    };
    // proceed 
    next();
  }

};

