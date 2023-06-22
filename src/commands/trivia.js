import { InteractionResponseFlags, InteractionResponseType } from 'discord-interactions';
import { json } from 'itty-router';

export const trivia = {
  data: {
    name: 'trivia',
    description: 'Get a random trivia question',
    options: [
      {
        name: 'difficulty',
        description: 'The difficulty of the question',
        type: 3,
        required: false,
        choices: [
          {
            value: 'easy',
            name: 'Easy difficulty',
          },
          {
            value: 'medium',
            name: 'Medium difficulty',
          },
          {
            value: 'hard',
            name: 'Hard difficulty',
          },
        ],
      },
    ],
  },
  execute: async (interaction) => {
    const difficulty = interaction.data.options?.[0]?.value ?? 'easy';
    const response = await fetch(`https://the-trivia-api.com/api/questions?limit=1&difficulty=${difficulty}`);
    if (!response.ok) {
      return json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Sorry, an error occurred while fetching the question. Try again`,
          flags: InteractionResponseFlags.EPHEMERAL,
        },
      });
    }

    const data = await response.json();

    if (!data?.length) {
      return json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Sorry, I couldn't find any questions with the difficulty \`${difficulty}\`. Try again with a different difficulty like \`easy\`?`,
          flags: InteractionResponseFlags.EPHEMERAL,
        },
      });
    }

    return json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `Question: ${data?.[0].question}\nAnswer: ${data?.[0].correctAnswer}`,
      },
    });
  },
};
