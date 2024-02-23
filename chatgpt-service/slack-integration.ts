
import * as SlackBolt from '@slack/bolt';
import dotenv from 'dotenv'
import axios from 'axios';
import axiosCurlirize from 'axios-curlirize';

dotenv.config();
axiosCurlirize(axios);

const app = new SlackBolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  port: 3000,
  logLevel: SlackBolt.LogLevel.DEBUG,
});

const addReactionToMessage = async (channel: string, timestamp: string, reaction: string) => {
  console.log("removeReactionToMessage", {channel, timestamp, reaction });
  const result = await app.client.reactions.add({
    channel,
    timestamp,
    name: reaction,
  })
  console.log({ result })
}

const removeReactionToMessage = async (channel: string, timestamp: string, reaction: string) => {
  console.log("removeReactionToMessage", {channel, timestamp, reaction });
  const result = await app.client.reactions.remove({
    channel,
    timestamp,
    name: reaction,
  })
  console.log({ result })
}

const replyToThread = async (id: string, ts: string, reply: string) => {
  console.log("replyToThread", {id, ts, reply });
  const result = await app.client.chat.postMessage({
    // token: process.env.SLACK_BOT_TOKEN,
    channel: id,
    thread_ts: ts,
    text: reply
  });

  // Print result
  console.log({ result });
}


app.message(async (event) => {
  console.log(event)
  const { message } = event;
  await addReactionToMessage(message.channel, message.ts, "thinking_face")
  await replyToThread(message.channel, message.ts, "Reply to thread");
  await removeReactionToMessage(message.channel, message.ts, "thinking_face")
  
  // const response = await axios.post("http://localhost:9999/chat", {
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     message
  //   })
  // })

  // console.log(response.data)
  
});

(async () => {
  // Start your app
  await app.start();

  console.log('Slack Bolt App is running!');
})();
