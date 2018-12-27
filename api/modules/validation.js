const fs = require('fs'); // file system

// setup new server environment
// check for ./store directory
function scaffoldNew(request, response, next) {
  // set variable to hold errors array
  response.locals.result = {
    message: "",
    errors: []
  };
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
      key: null,
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
  // pass message
  response.locals.result.message = "Scaffold completed.";
  // proceed
  next();
}

const Validation = {
  server: {
    scaffoldNew
  }
};

module.exports = Validation;