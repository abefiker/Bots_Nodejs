const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchForcast } = require('../requests/forcast');

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
  await interaction.deferReply();
  const location = interaction.options.getString('location');
  const units = interaction.options.getString('units') || 'metric';
  const isMetric = units === 'metric'; // Set default to 'metric' if not provided

  try {
    const { locationName, weatherDate } = await fetchForcast(location);

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Weather forecast for ${locationName} ...`)
      .setDescription(`Using units ${units} system`)
      .setTimestamp()
      .setFooter({
        text: 'Powered by WeatherAPI',
        // iconURL: 'https://cdn.discordapp.com/icons/726576249498296340/a_975427842994780160.png',
      });
    for (const day of weatherDate) {
      const temperatureMin = isMetric
        ? day.temperatureMinC
        : day.temperatureMinF;
      const temperatureMax = isMetric
        ? day.temperatureMaxC
        : day.temperatureMaxF;
      embed.addFields({
        name: day.date,
        value: `⬇️ Low is ${temperatureMin}° ,⬆️ High is ${temperatureMax}°`,
      });
    }
    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    await interaction.editReply({ content: `Error fetching forecast: ${err.message}` });
  }

};

module.exports = {
  data,
  execute,
};
