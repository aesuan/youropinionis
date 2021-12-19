const fs = require('fs');
const path = require('path');

const headers = {
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const getRouter = (req, res, next) => {
  // const path = req.url.split('/');
  switch(req.url) {
    case '/static/main.js':
      res.writeHead(200, headers);
      res.write(`console.log('js working!');`);
      res.end();
      next();
      break;
      case '/static/main.css':
        res.writeHead(200, headers);
        res.write(`body {\n  background-color: red;\n}
        `);
        res.end();
        next();
        break;
    // case '/favicon.ico':
    //   break;
    // case '/js':
    //   break;
    default:
      const pathAsString = req.url.replace(/\//g, ' ').trim();
      console.log('path as string', pathAsString);
      res.writeHead(200, headers);
      res.write(`<html>
        <head>
          <link rel="stylesheet" type="text/css" href="/static/main.css">
        </head>
        <body>
          <h1>
            <label for="blank">your opinion is </label>
            <input type="text" id="blank" name="blank" value="${pathAsString}">
          </h1>
          <script src="/static/main.js"></script>
        </body>
      </html>
      `);
      res.end();
      next();
  }
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
};