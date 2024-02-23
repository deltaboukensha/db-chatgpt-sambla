
import * as SlackBolt from '@slack/bolt';
import dotenv from 'dotenv'

dotenv.config();

const app = new SlackBolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  port: 3000,
  logLevel: SlackBolt.LogLevel.DEBUG,
});

app.message(async ({ message, say }) => {
  console.log("message event", { message })
  say(`Hey listen to any message!`);
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  console.log({message})
  say(`Hey there!`);
});

(async () => {
  // Start your app
  await app.start();

  console.log('⚡️ Bolt app is running!');
})();
