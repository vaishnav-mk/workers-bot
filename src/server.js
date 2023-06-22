import { Router, withContent, error, json } from 'itty-router';
import { InteractionResponseType, InteractionType, verifyKey } from 'discord-interactions';
import commands from './commands';

const router = Router();

router.get('/', (request, env) => {
  return json({ hello: 'world' });
});

router.post('/', withContent, async (request, env) => {
  const interaction = request.content;
  const isValidRequest = await verifyDiscordRequest(request, env.DISCORD_PUBLIC_KEY);

  if (!isValidRequest) {
    return error(401, 'invalid request signature');
  }

  if (interaction.type === InteractionType.PING) {
    return json({
      type: InteractionResponseType.PONG,
    });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const command = commands.find((command) => command.data.name.toLowerCase() === interaction.data.name.toLowerCase());

    if (!command) {
      console.error('Unknown Command');
      return json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Unknown Command',
        },
      });
    }

    try {
      const response = await command.execute(interaction, env);
      return json(response);
    } catch (error) {
      console.error('Error executing command', error);
      return json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'Error executing command',
        },
      });
    }
  }
});

router.all('*', () => new Response('Not Found.', { status: 404 }));

async function verifyDiscordRequest(request, key) {
  const body = JSON.stringify(request.content);

  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');

  const isValidRequest =
    signature && timestamp && verifyKey(body, signature, timestamp, key);

  return isValidRequest;
}

export default {
  async fetch(request, env) {
    return router.handle(request, env);
  },
};