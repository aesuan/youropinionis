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
      res.write(`console.log('js working!');
      const input = document.querySelector('input');
      const title = document.querySelector('title');
      const state = {};

      // debounce replacing state - push every once in a while
      const updateURL = function updateURL(e) {
        const val = e.target.value.trim();
        const path = '/' + val.replace(/ /g, '/');
        // emojis? non-english chars?
        const spaceSeparatedVals = '/' + val.split(' ').map(encodeURIComponent).join('/');
        history.replaceState(state, '', path);
        title.innerText = \`your opinion is \${val}\`;
      };

      input.addEventListener('input', updateURL);
      `);
      res.end();
      next();
      break;
      case '/static/main.css':
        res.writeHead(200, headers);
        res.write(`body {
          background-color: red;
        }
        input {
          ${/*-webkit-writing-mode: horizontal-tb !important;*/''}
          font-style: inherit;
          font-variant-ligatures: inherit;
          font-variant-caps: inherit;
          font-variant-numeric: inherit;
          font-variant-east-asian: inherit;
          font-weight: inherit;
          font-stretch: inherit;
          font-size: inherit;
          font-family: inherit;
          text-rendering: auto;
          color: inherit;
          ${/*letter-spacing: normal;
          word-spacing: normal;
          line-height: normal;
          text-transform: none;
          text-indent: 0px;
          text-shadow: none;
          display: inline-block;
          text-align: start;
          appearance: auto;
          -webkit-rtl-ordering: logical;
          */''}
          cursor: text;
          background-color: inherit;
          ${/*margin: 0em;
          padding: 1px 2px;
          border-width: 2px;
          border-style: inset;
          border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
          border-image: initial;*/''}
          border: none;
        }

        input:focus-visible {
          outline: none;
        }
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
          <title>your opinion is ${pathAsString || '...'}</title>
        </head>
        <body>
          <h1>
            <label for="blank">your opinion is </label>
            <input type="text" id="blank" name="blank" value="${/*req.url.split('/').map(decodeURIComponent).join(' ').trim()*/ pathAsString || '...'}">
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