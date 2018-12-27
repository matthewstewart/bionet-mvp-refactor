const userRequired = require("../modules/apiAccess").userRequired;

module.exports = function(router) {

  router.get('/', (req, res) => {
    const response = {
      message: "Welcome to the Bionet API.",
      data: [], 
      errors: []
    };
    res.status(200).json(response);
  }); 

};