const moment = require("moment");

const logger = (req, res, next) => {
    console.log(
      req.protocol+ //protocol is http
      "://"+
      req.get("host")+ //host is port/host lol
      req.originalUrl+ 
      ":",
      moment().format() //gives current day and time
    );
    // everytime you make a request, it logs in console
    next();
  };
module.exports = logger;