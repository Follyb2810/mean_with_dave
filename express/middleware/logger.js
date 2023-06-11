// const logEvent =require('./logEvent')
const logEvent =require('./logEvent')
const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.url}\t${req.header.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
  };


  module.exports = logger