const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtException.log" })
  );
  process.on("unhandledRejection", ex => {
    // console.log("WE GOT AN UNHANDLED REJECTION");
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex;
  });

  try {
    winston.add(
      new winston.transports.File({
        filename: "logfile.log"
      })
    );
    // winston.add(
    //   new winston.transports.MongoDB({
    //     db: "mongodb://localhost/vidly",
    //     level: "error"
    //   })
    // );
  } catch (error) {
    console.error(error);
  }
};
