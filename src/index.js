import { default as restify } from 'restify';

const server = restify.createServer();

server.use(restify.bodyParser());

server.post('/aws', (req, res) => {
  console.log(req.body);
  res.send(204);
});

server.listen(7777, () => {
  console.log(`${server.name} listening at ${server.url}`);
});