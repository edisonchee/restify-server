import { restify } from 'restify';

const server = restify.createServer();

server.use(restify.bodyParser());

server.post('/aws', (req, res) => {
  // send something
});
