import { default as restify } from 'restify';
import { default as Slimbot } from 'slimbot';

const slimbot = new Slimbot(process.env.TELEGRAM_TOKEN);
const userId = process.env.TELEGRAM_USER_ID;
const server = restify.createServer();

server.use(restify.bodyParser());

server.post('/aws', (req, res) => {
  const body = JSON.parse(req.body);
  const message = `Subject: ${body.subject}\nMessage: ${body.message}`;
  slimbot.sendMessage(userId, message);
  res.send(204);
});

server.listen(7777, () => {
  console.log(`${server.name} listening at ${server.url}`);
});

slimbot.startPolling();