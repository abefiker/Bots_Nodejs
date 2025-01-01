const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const { clientReadyHandler } = require('./events/clientReady');
const { interactionCreateHandler } = require('./events/interactionCreate');

const pingCommand = require('./commands/ping');
const forcastCommand = require('./commands/forecast');
const astroCommand = require('./commands/astro');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

client.commands.set(pingCommand.data.name, pingCommand);
client.commands.set(forcastCommand.data.name, forcastCommand);
client.commands.set(astroCommand.data.name, astroCommand);
client.once(Events.ClientReady, () => clientReadyHandler(client));
client.on(Events.InteractionCreate, interactionCreateHandler);

client.login(process.env.BOT_RESET_TOKEN);
