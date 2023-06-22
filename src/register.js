import commands from './commands/index.js';
import 'dotenv/config'

console.log('Registering commands...');

const token = process.env.DISCORD_TOKEN
const applicationId = process.env.DISCORD_APPLICATION_ID

if (!token) {
  throw new Error('The DISCORD_TOKEN environment variable is required.');
}

if (!applicationId) {
  throw new Error('The DISCORD_APPLICATION_ID environment variable is required.');
}

const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;

const commandData = commands.map((command) => command.data);

const response = await fetch(url, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bot ${token}`,
  },
  method: 'PUT',
  body: JSON.stringify(commandData),
});

if (response.ok) {
  const data = await response.json();
  console.log(`Successfully registered ${data.length} commands: ${data.map((command) => command.name).join(', ')}`);
} else {
  let errorText = `Error registering commands ${response.url}: ${response.status} ${response.statusText}`;
  try {
    const error = await response.text();
    if (error) {
      errorText = `${errorText} \n\n ${error}`;
    }
  } catch (err) {
    console.err('Error reading body from request:', err);
  }
  console.error(errorText);
}
