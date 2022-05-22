const Logger = require('../logger/logger');

// TO remove the try..catch block from individual routes for Exceptions.
// Also passing the next() for routes from here only to handle exceptions.

module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
      try{
        await handler(req, res);
      }
      catch (ex){
          Logger.error(ex);
          if (ex.name === 'SequqlizeDatabaseError'){
            res.status(500).send('Please Verify Your Inputs.')
        }
        res.send('Error');
        next(ex);
      }
    };
}


// We don't use this middleware but instead just passes a reference 
//to this middleware function using express-async-errors.
