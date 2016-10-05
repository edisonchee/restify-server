import { default as restify } from 'restify';

const server = restify.createServer();

server.use(restify.bodyParser());

server.post('/aws', (req, res) => {
  const body = JSON.parse(req.body);
  console.log(`Subject: ${body.subject}\nMessage: ${body.message}`);
  res.send(204);
});

server.listen(7777, () => {
  console.log(`${server.name} listening at ${server.url}`);
});