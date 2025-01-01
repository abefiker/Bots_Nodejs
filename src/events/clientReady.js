const { REST, Routes, version } = require('discord.js');
const { fetchForcast } = require('../requests/forcast');

const rest = new REST({ version: '10' }).setToken(process.env.BOT_RESET_TOKEN);
const clientReadyHandler = async (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(await fetchForcast('Addis Ababa'))
  try {
    console.log(`Started Refreshing  ${client.commands.size} commands!`);
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: client.commands.map((command) => {
          return command.data.toJSON();
        }),
      }
    );
    console.log(`successfully reloaded ${data.length} commands`);
  } catch (err) {
    client.error(err);
  }
};

module.exports = {
  clientReadyHandler,
};
