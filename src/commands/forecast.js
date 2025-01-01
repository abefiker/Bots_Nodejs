const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
  .setName('forcast')
  .setDescription('Get weather forecast for a city')
  .addStringOption((option) => {
    return option
      .setName('location')
      .setDescription(
        'The location can be city name, zip/postal code, or latitude/longitude'
      )
      .setRequired(true);
  })
  .addStringOption((option) => {
    return option
      .setName('units')
      .setDescription(
        'The unit system of the results: either "metric" or "imperial".'
      )
      .setRequired(false)
      .addChoices(
        { name: 'metric', value: 'metric' },
        { name: 'imperial', value: 'imperial' }
      );
  });

const execute = async (interaction) => {
  const location = interaction.options.getString('location');
  const units = interaction.options.getString('units') || 'metric'; // Set default to 'metric' if not provided

  await interaction.reply(
    // `Fetching the weather forecast for ${location} using ${units} units!`
    'the Weaher is great'
  );

  // Here you can integrate the weather fetching logic using the `location` and `units`
};

module.exports = {
  data,
  execute,
};
