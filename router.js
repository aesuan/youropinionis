const fs = require('fs');
const path = require('path');

const headers = {
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
}

const getRouter = (req, res, next) => {
  const pathAsString = req.url.replace(/\//g, ' ').trim();
  console.log('path as string', pathAsString);
  res.writeHead(200, headers);
  res.write(pathAsString);
  res.end();
  next();
};

exports.route = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  switch(req.method) { // determines what type of response we're sending, based on type of request
    case 'GET':
      getRouter(req, res, next);
      break;
    // case 'POST':
    //   postRouter(req, res, next);
    //   break;
    case 'OPTIONS':
      res.writeHead(200, headers);
      res.end();
      next();
      break;
    default:
      //for any other type - method not allowed
      res.writeHead(405, headers);
      res.end();
      next(); // invoke next() at the end of a request to help with testing!
      break;
  }
}