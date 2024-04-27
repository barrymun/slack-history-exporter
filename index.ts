import 'dotenv/config'

import { WebClient } from '@slack/web-api';

const slackApiToken = process.env.SLACK_API_TOKEN;
const slackChannelId = process.env.SLACK_CHANNEL_ID;

if (!slackApiToken) {
  throw new Error('No SLACK_API_TOKEN provided!');
}

if (!slackChannelId) {
  throw new Error('No SLACK_CHANNEL_ID provided!');
}

(async () => {
  const web = new WebClient(slackApiToken);
  const args = {
    token: slackApiToken,
    channel: slackChannelId,
  };

  let res;
  for await (const page of web.paginate('conversations.history', args)) {
    const data = page as unknown as ReturnType<typeof web.conversations.history>;
    console.log((await data).messages?.map((m) => m.text));
  }
})();
