module.exports = (client) => {
  const color = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    fg: {
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",
    },
  };

  client.on('messageCreate', (message) => {
    console.log(
      `${color.fg.green}[${message.guild.name}]${color.reset} ` +
      `${color.fg.cyan}${message.author.username}${color.reset}: ` +
      `${color.fg.yellow}${message.content}${color.reset}`
    );
  });

  client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    console.log(
      `${color.fg.magenta}[${interaction.guild.name}]${color.reset} ` +
      `${color.fg.blue}${interaction.user.username}${color.reset} ` +
      `used command: ${color.fg.green}${commandName}${color.reset}`
    );
  });
};
