const http = require('http');
const router = require('./router');

const server = http.createServer();
server.on('request', router.route);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);