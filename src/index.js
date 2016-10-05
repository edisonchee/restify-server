import { default as restify } from 'restify';
import { default as Slimbot } from 'slimbot';
import { default as prettysize } from 'prettysize';

const slimbot = new Slimbot(process.env.TELEGRAM_TOKEN);
const userId = process.env.TELEGRAM_USER_ID;
const server = restify.createServer();

server.use(restify.bodyParser());

server.post('/aws', (req, res) => {
  const bodyObj = JSON.parse(req.body);
  const msgObj = JSON.parse(bodyObj.Message);
  const record = msgObj.Records[0];
  const params = {
    parse_mode: 'Markdown',
  };
  const message = `*Action:* ${record.eventName}\n*IP:* ${record.requestParameters.sourceIPAddress}\n*Bucket:* ${record.s3.bucket.name}\n*Object Key:* ${record.s3.object.key}\n*Object Size:* ${prettysize(record.s3.object.size)}`;
  slimbot.sendMessage(userId, message, params);
  res.send(204);
});

server.listen(7777, () => {
  console.log(`${server.name} listening at ${server.url}`);
});

slimbot.startPolling();