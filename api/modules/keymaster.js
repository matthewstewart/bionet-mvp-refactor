const fs = require('fs');
const util = require('util');
const Dat = require('dat-node');

// convert dat instantiation method from callback to async
const DatAsync = util.promisify(Dat);

async function newDat() {
  try {
    let res = await DatAsync('./store');
    console.log('newDat.res', res);
    return res;
  } catch (error) {
    throw error;
  }
}

function newDatSync(filePath) {
  newDat(filePath)
  .then((res) => {
    console.log('newDatSync.res', res);
    return res;
  }).catch((error) => {
    throw error;
  });
}

// async function instantiateDat(storePath) {
//   try {
//     let generateDatResponse = await generateDat('../store');
//     return generateDatResponse;
//   } catch (error) {
//     throw error;
//   }
// }

function exampleMiddlewareFunction(request, response, next) {
  // with callback function
  // exampleCallbackFunction('./store', (error, res) => {
  //   if (error) { throw error; }
  //   response.locals.result = {
  //     message: res
  //   };  
  //   next();
  // });

  // with callback function converted to async function 
  // exampleCallbackFunctionAsync('./store')
  // .then((res) => {
  //   console.log('exampleCallbackFunctionAsync.res', res);
  //   response.locals.result = {
  //     message: "Async conversion was used on a callback function."
  //   };  
  //   next();
  // });

  // with
}


function exampleCallbackFunction(filePath, cb) {
  let response, error;
  if (fs.existsSync(filePath)) {
    response = "File path exists";
    error = null;
  } else {
    response = null;
    error = new Error('Filepath was not provided');
  }
  cb(error, response);
}

const exampleCallbackFunctionAsync = util.promisify(exampleCallbackFunction);

const Keymaster = {
  server: {
    exampleCallbackFunction,
    exampleMiddlewareFunction
  }
};

module.exports = Keymaster; 