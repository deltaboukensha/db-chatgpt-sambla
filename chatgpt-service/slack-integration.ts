
import * as SlackBolt from '@slack/bolt';
import dotenv from 'dotenv'
import axios from 'axios';
import axiosCurlirize from 'axios-curlirize';
import { GenericMessageEvent } from '@slack/bolt';

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
  const message = event.message as GenericMessageEvent;

  try{
    await addReactionToMessage(message.channel, message.ts, "thinking_face")

    const response = await axios.post("http://chatgpt-service:9999/chat", {
        message: message.text,
      },
      { headers: {
        "Content-Type": 'application/json',
      }
      },
    )

    console.log("chatResponse", response.data)

    await replyToThread(message.channel, message.ts, response.data);
  }
  catch(error){
    console.error(error);
    await addReactionToMessage(message.channel, message.ts, "everythings_fine_parrot");
  }
  finally{
    await removeReactionToMessage(message.channel, message.ts, "thinking_face");
  }
});

(async () => {
  // Start your app
  await app.start();

  console.log('Slack Bolt App is running!');
})();
