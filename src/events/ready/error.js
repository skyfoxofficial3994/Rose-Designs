module.exports = (client) => {
  const formatErrorMessage = (title, error) => `
    ========= ${title} =========
    Time: ${new Date().toLocaleString()}
    Error: ${error}
    ==============================
  `;

  const logErrorToConsole = (title, error) => {
    console.error(formatErrorMessage(title, error));
  };

  const sendErrorToChannel = (title, error) => {
    const channel = client.channels.cache.get('YOUR_ERROR_LOG_CHANNEL_ID');
    if (channel) {
      channel.send(`**${title}**\n\`\`\`js\n${error}\n\`\`\``);
    }
  };

  client.on('commandError', (command, error, message) => {
    const errorTitle = `Error executing command '${command.name}'`;
    logErrorToConsole(errorTitle, error);
    sendErrorToChannel(errorTitle, error);
  });

  client.on('error', (error) => {
    const errorTitle = 'Bot encountered an error';
    logErrorToConsole(errorTitle, error);
    sendErrorToChannel(errorTitle, error);
  });
};
