const Lab = require("../models/Lab");
const fetchAll = require("../modules/fetch").fetchAll;
const fetchOne = require("../modules/fetch").fetchOne;

module.exports = function(router) {

  // show one record
  // ex. http://localhost:3001/api/v1/labs/5be539538a1ad7177722787f
  router.get("/labs/:recordId", (req, res) => {
    // if no dat found with key of :recordId
    if (!res.locals.datFound) {
      fetchOne(Lab, req.params.recordId)
      .then((result) => {
        let jsonResponse = {
          message: "Success - data retrieved from Bionet Centralized Database",
          error: {},
          data: result
        };
        res.json(jsonResponse);
      })
      .catch((error) => {
        let message;
        let statusCode;
        if (error.name === 'CastError'){
          statusCode = 404;
          message = `Record with _id ${error.value} not found`;
        } else {
          statusCode = 500;
          message = "An error occurred."
        }
        let jsonResponse = {
          message,
          error,
          data: {}
        };
        res.status(statusCode).json(jsonResponse);
      });
    // if dat was found with key of :recordId  
    } else {
      let message = "Success - data retrieved from Dat Peer To Peer Network";
      let jsonResponse = {
        message,
        error,
        data: res.locals.dat
      };
      res.json(jsonResponse);      
    }  
  });

  // list all records
  // ex. http://localhost:3001/api/v1/labs/
  router.get("/labs", (req, res) => {
    fetchAll(Lab)
    .then((result) => {
      let jsonResponse = {
        message: "Success",
        error: {},
        data: result
      };
      res.status(200).json(jsonResponse);
    })
    .catch((error) => {
      let jsonResponse = {
        message: "There was an error",
        error,
        data: []
      };
      res.status(500).json(jsonResponse);      
    });
  });

};