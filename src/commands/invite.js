import { InteractionResponseFlags, InteractionResponseType } from 'discord-interactions';
import { json } from 'itty-router';

export const invite = {
  data: {
    name: 'invite',
    description: 'Get the invite link for this bot',
  },
  execute: async (interaction, env) => {
    const applicationId = env.DISCORD_APPLICATION_ID;
    const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${applicationId}&scope=applications.commands`;
    return json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Invite me to your server with this link: ${INVITE_URL}`,
        flags: InteractionResponseFlags.EPHEMERAL,
      },
    });
  },
};
