const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchForcast } = require('../requests/forcast');

const data = new SlashCommandBuilder()
  .setName('astro')
  .setDescription('Replies with Astronomical Information')
  .addStringOption((option) => {
    return option
      .setName('location')
      .setDescription(
        'The location can be city name, zip/postal code, or latitude/longitude'
      )
      .setRequired(true);
  });

const execute = async (interaction) => {
  try {
    // Defer the reply to allow for more processing time
    await interaction.deferReply();

    const location = interaction.options.getString('location');

    const { locationName, weatherDate } = await fetchForcast(location);

    const embed = new EmbedBuilder()
      .setColor(0x3f704d)
      .setTitle(`Astro forecast for ${locationName} ...`)
      .setTimestamp()
      .setFooter({
        text: 'Powered by WeatherAPI',
      });

    for (const day of weatherDate) {
      embed.addFields({
        name: day.date,
        value: `🌅 Sunrise : ${day.sunriseTime}\n🌇 Sunset : ${day.sunsetTime}\n🌕 MoonRise : ${day.moonriseTime}\n🌚 MoonSet : ${day.moonsetTime}`,
      });
    }

    // Edit the deferred reply with the embed
    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    // Handle errors gracefully
    console.error('Error executing command:', err);
    await interaction.editReply({
      content: `Error fetching forecast: ${err.message}`,
    });
  }
};

module.exports = {
  data,
  execute,
};
