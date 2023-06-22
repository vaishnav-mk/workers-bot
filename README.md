# Discord Bot with Cloudflare Workers

This project showcases how to build a Discord bot using Cloudflare Workers. The bot interacts with Discord's API and registers commands for your application.

## Prerequisites

Before getting started, make sure you have the following prerequisites:

- Node.js (v16 or higher)
- Discord token (obtained from the Discord Developer Portal)
- Discord application ID

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/vaishnav-mk/workers-bot.git
```
2.Install the dependencies:
 ```bash
    cd workers-bot
    npm install
```
3. Configure the environment variables:

Create a `.env` file in the project root.

Add the following environment variables to the .env file:

```bash
    DISCORD_TOKEN=your-discord-token
    DISCORD_PUBLIC_KEY=your-discord-application-id
    DISCORD_APPLICATION_ID=your-discord-application-id
```

4. Configure the Cloudflare Workers CLI:

```bash
   npm install -g @cloudflare/wrangler
   wrangler config
```

## Usage

1. Register the commands with Discord:

```bash
    npm run register
```

2. To run the Discord bot locally, execute the following command:

```bash
    npm start
```
### Use ngrok or Cloudflare Tunnel to expose the local server to the internet and add the URL to the Discord Developer Portal.

3. Publish the Worker:

```bash
    wrangler publish
``` 

### Use the published URL as the Discord Interactions Endpoint URL in the Discord Developer Portal.


The bot will now be active and ready to respond to commands in your Discord server.

## Contributing
Contributions are welcome! If you have any improvements or bug fixes, feel free to submit a pull request.

## License
This project is licensed under the MIT License.

* Feel free to modify the content and structure of the README.md file as per you
