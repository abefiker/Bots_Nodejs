// src/events/interactionCreate.js
const interactionCreateHandler = async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  } // Ensure it's a slash command interaction

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command found for ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
    console.log(
      `${interaction.user.username} used command ${interaction.commandName}`
    );
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
};
module.exports = {
  interactionCreateHandler,
};
