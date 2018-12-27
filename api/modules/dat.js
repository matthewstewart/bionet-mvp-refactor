// dat middleware

const checkForDat = async (req, res, next) => {
  try {
    let id = req.params.recordId;
    let datFound = false;
    let dat = null;
    /***************************************************************/
    /* See datMiddlewareExample.js for example on how to implement */
    /***************************************************************/
      // if dat found 
        // datFound = true;
        // dat = returned data.json from dat    
    // return results and proceed on to rest of route
    res.locals.datFound = datFound;
    res.locals.dat = dat;
    next();
  } catch (error) {
    res.locals.errors.push(error);
    next();
  }
};

module.exports = {
  checkForDat
};