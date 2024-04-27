import 'dotenv/config'
import fs from 'fs';

import { WebClient } from '@slack/web-api';

const slackApiToken = process.env.SLACK_API_TOKEN;
const slackChannelId = process.env.SLACK_CHANNEL_ID;
const fileName = 'history.txt';
const messageDelimiter = '\n====================\n';

if (!slackApiToken) {
  throw new Error('No SLACK_API_TOKEN provided!');
}

if (!slackChannelId) {
  throw new Error('No SLACK_CHANNEL_ID provided!');
}

/**
 * check if file exists, if not create it or clear the contents if it does
 */
function createFile() {
  fs.access(fileName, fs.constants.F_OK, function (_err) {
    fs.writeFile(fileName, '', function (err) {
      if (err) {
        console.error(`Error creating file: ${err}`);
      }
    });
  });
}

/**
 * append content to file
 */
function appendToFile(content: string) {
  fs.appendFile(fileName, content, function (err) {
    if (err) {
      console.error(`Error appending to file: ${err}`);
    }
  });
}

(async () => {
  createFile();

  const web = new WebClient(slackApiToken);
  const args = {
    token: slackApiToken,
    channel: slackChannelId,
  };

  for await (const page of web.paginate('conversations.history', args)) {
    const response = page as unknown as ReturnType<typeof web.conversations.history>;
    const content = ((await response).messages ?? []).map((m) => m.text ?? '').join(messageDelimiter);
    appendToFile(content);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // basic rate limit prevention
  }
})();
