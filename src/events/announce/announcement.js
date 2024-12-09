/**
 *
 * @param {Client} client
 * @param {Interaction} interaction
 */
module.exports = async (client, interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'announce') {
    try {
      const announcement = interaction.options.getString('announcement');

      const announcementChannel = interaction.guild.channels.cache.find(
        (channel) => channel.name === 'announcements'
      );

      if (!announcementChannel) {
        await interaction.reply('No announcement channel found.');
        return;
      }

      await announcementChannel.send(announcement);
      await interaction.reply('Announcement sent successfully.');
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
};
