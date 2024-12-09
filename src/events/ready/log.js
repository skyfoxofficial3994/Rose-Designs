module.exports = (client) => {
  // Utility for creating ANSI-styled messages
  const createStyledMessage = (text, color) => `${color}${text}\x1b[0m`;

  // ANSI escape codes for colors
  const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    fgGreen: "\x1b[32m",
    fgRed: "\x1b[31m",
    fgBlue: "\x1b[34m",
    fgYellow: "\x1b[33m",
    fgCyan: "\x1b[36m",
    fgMagenta: "\x1b[35m",
  };

  // Bot mention info
  const mentionUsername = client.user.username.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const mentionId = client.user.id;
  const mentionName = `<@${mentionId}> (${mentionUsername})`;

  // Bot Status
  console.log(createStyledMessage(`🎉 ${mentionName} is now online!`, colors.fgGreen));
  console.log(createStyledMessage(`📋 Bot ID: ${mentionId}`, colors.fgCyan));
  console.log(createStyledMessage(`Bot Created At: ${new Date(client.user.createdTimestamp).toLocaleString()}`, colors.fgBlue));
  console.log(createStyledMessage(`Avatar URL: ${client.user.avatarURL()}`, colors.fgCyan));

  // Servers Info (Unique servers without duplication)
  console.log(createStyledMessage(`🌐 Currently in the following servers:`, colors.fgMagenta));
  client.guilds.cache.forEach((guild, index) => {
    console.log(createStyledMessage(`Server #${index + 1}: ${guild.name}`, colors.fgMagenta));
    console.log(createStyledMessage(`Owner: ${guild.owner ? guild.owner.user.tag : 'Unknown'}`, colors.fgYellow));
    console.log(createStyledMessage(`Region: ${guild.region}`, colors.fgCyan));
    console.log(createStyledMessage(`Verification Level: ${guild.verificationLevel}`, colors.fgBlue));
    console.log(createStyledMessage(`Boost Level: ${guild.premiumTier}`, colors.fgGreen));
    console.log(createStyledMessage(`AFK Channel: ${guild.afkChannel ? guild.afkChannel.name : 'None'}`, colors.fgYellow));
    console.log(createStyledMessage(`Members: ${guild.memberCount}`, colors.fgGreen));
    console.log(''); // Space between each server output
  });

  // Statistics
  console.log(createStyledMessage(`👥 Total users: ${client.users.cache.size}`, colors.fgGreen));
  console.log(createStyledMessage(`📺 Total channels: ${client.channels.cache.size}`, colors.fgBlue));
  const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
  console.log(createStyledMessage(`📊 Serving ${totalMembers} users across all servers.`, colors.fgYellow));
  console.log(createStyledMessage(
    `🔗 Invite the bot: https://discord.com/oauth2/authorize?client_id=${mentionId}&permissions=8&scope=bot`,
    colors.fgCyan
  ));

  // Log the bot initialization message
  console.log(createStyledMessage(`Bot Initialized: AFGC | Test Bot#6120 is online!`, colors.fgGreen));
  console.log(createStyledMessage(`Bot ID: 1315377986563735673`, colors.fgCyan));

  // Event Listeners
  const logEvent = (emoji, message, color) => console.log(createStyledMessage(`${emoji} ${message}`, color));

  client.on('guildMemberAdd', member =>
    logEvent('✅', `${member.user.username} joined ${member.guild.name}.`, colors.fgGreen)
  );

  client.on('guildMemberRemove', member =>
    logEvent('❌', `${member.user.username} left ${member.guild.name}.`, colors.fgRed)
  );

  client.on('guildBanAdd', (guild, user) =>
    logEvent('🚫', `${user.username} was banned from ${guild.name}.`, colors.fgRed)
  );

  client.on('guildMemberRemove', (member) => {
    if (member.kickable) {
      logEvent('⚠️', `${member.user.username} was kicked from ${member.guild.name}.`, colors.fgYellow);
    }
  });

  client.on('guildMemberWarn', (member, reason) =>
    logEvent('⚠️', `${member.user.username} was warned in ${member.guild.name}. Reason: ${reason}.`, colors.fgBlue)
  );

  client.on('guildMemberMute', (member, reason, duration) =>
    logEvent('🔇', `${member.user.username} was muted in ${member.guild.name}. Reason: ${reason}. Duration: ${duration}.`, colors.fgBlue)
  );

  client.on('guildMemberBan', (member, reason, duration) =>
    logEvent('🚫', `${member.user.username} was banned from ${member.guild.name}. Reason: ${reason}. Duration: ${duration}.`, colors.fgRed)
  );
};
