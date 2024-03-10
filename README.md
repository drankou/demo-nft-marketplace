# Demo NFT Marketplace

## Project Overview

This is a demo app that allows authorized users to access a list of NFT (Non-fungible token) items managed from a specific table on a Notion page via the Notion API. The application uses Next.js with TypeScript and employs Incremental Static Regeneration (ISR). Authorization is handled via Telegram.

| Login page | Home page |
| ----- | --------- |
| ![CleanShot 2024-03-10 at 18 08 18@2x](https://github.com/drankou/demo-nft-marketplace/assets/25752851/c6ca8041-27a6-404b-82d1-5f3520371871)| ![CleanShot 2024-03-10 at 18 07 45@2x](https://github.com/drankou/demo-nft-marketplace/assets/25752851/2fc131e2-f71d-4a1d-9402-067bc00d4c78)|

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Local development

1. Create `.env.local` file by copying `.env.example` file

```bash
cp .env.example .env.local
```

2. Start a tunnel to your local server (e.g. using [ngrok](https://ngrok.com/) or [serveo](https://serveo.net/))

   ```bash
   ngrok http 3000
   # or
   ssh -R 80:localhost:3000 serveo.net
   ```

   1. Copy the tunnel URL and save it into a `.env.local` file as `NEXTAUTH_URL`.
   2. Generate a random string and save it into a `.env.local` file as `NEXTAUTH_SECRET`.

      ```bash
      openssl rand -base64 32 | pbcopy
      ```

3. Create a Telegram Bot

   1. Go to [BotFather](https://t.me/botfather) and create a new bot.
   2. Set bot username and save it into a `.env.local` file as `BOT_USERNAME`.
   3. Copy the bot token and save it into a `.env.local` file as `BOT_TOKEN`.
   4. Set bot's domain via BotFather's `/setdomain` command to be equal to the `NEXTAUTH_URL` value.

4. Create a Notion Integration

   1. Go to [Notion Integrations](https://www.notion.so/my-integrations) and create a new integration.
   2. Copy the `Internal Integration Token` and save it into a `.env.local` file as `NOTION_TOKEN`.
   3. Connect the integration to the Notion page that contains the table you want to connect.
     <img width="500" alt="Connect integration to Notion page" src="https://github.com/drankou/demo-nft-marketplace/assets/25752851/964a0992-81a1-494d-b8e7-5703ff22c338">

5. Set table block id from Notion page

   1. Select the table block and copy link to the block
      <img width="600" alt="Connect integration to Notion page" src="https://github.com/drankou/demo-nft-marketplace/assets/25752851/9db45796-c901-4801-b8b6-0dc27c662ff0">
   2. Copy the block id from the link and save it into a `.env.local` file as `NEXT_PUBLIC_NOTION_TABLE_BLOCK_ID`. Block id is the last part of the link, after the `#` sign:

   ```
   Link: https://www.notion.so/user123/Demo-b13ea722c46b4b5a9dc57019bec72e97?pvs=4#7ca1b622e7e940dcb898cfa01630d30f
   Table block id: 7ca1b622e7e940dcb898cfa01630d30f
   ```

6. Install dependencies

```bash
yarn install
```

6. Run the development server

```bash
yarn dev
```

## Live Demo

You can access the live demo of the application at http://demo-nft-marketplace-one.vercel.app.
