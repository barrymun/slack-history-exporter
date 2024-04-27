# Slack history exporter

## Overview

Retrieve messages from DM (direct message) channels in Slack and append the output to a file. The functionality is basic and only the text content of the messages is appended to a new file with a given delimiter.

## Get Started

> [!NOTE]
> You'll need to create an app in [Slack](https://api.slack.com/apps).
> Navigate to "OAuth & Permissions" and add the following **user token scopes**:
> ```[[scopes]]
> im:history
> ```

> [!TIP]
> Make sure that **user token scopes** are used instead of bot token scopes, otherwise the DM history will not be retrieved.

> [!NOTE]
> You will need to create a `.env` file at the root level of the project with the following keys:
> ```[[env]]
> SLACK_API_TOKEN=''
> SLACK_CHANNEL_ID=''
> ```

## Usage

Install dependencies:

```bash
yarn install
```

Run the script:

```bash
yarn run exe
```

The file `history.txt` will be created. If it already exists the contents will be overwritten.

## Why does this exist?

Useful for people who may want to save messages from a Slack workspace that they are leaving, or a Slack workspace where the license is expiring.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
