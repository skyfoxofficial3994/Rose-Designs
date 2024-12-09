const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'announce',
  description: 'Announce something from the bot.',
  options: [
    {
      name: 'announcement',
      description: 'The announcement you want to make.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'channel',
      description: 'The channel where the announcement should go.',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  callback: async (client, interaction) => {
    const announcement = interaction.options.getString('announcement');
    const channelId = interaction.options.getChannel('channel').id;
    const announcementChannel = interaction.guild.channels.cache.get(channelId);

    if (!announcementChannel) {
      await interaction.reply('No announcement channel found.');
      return;
    }

    await announcementChannel.send(announcement);
    await interaction.reply('Announcement sent successfully.');
  },
};
