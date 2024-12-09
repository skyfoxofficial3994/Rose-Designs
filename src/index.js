require("dotenv").config();
const mongoose = require("mongoose");
const {
  Client,
  GatewayIntentBits,
  Collection,
} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");



// Initialize the bot client with required intents
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Register event handlers
eventHandler(bot);

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB.");

    // Login the bot using the token stored in .env file
    await bot.login(process.env.Token);
    console.log("Bot logged in.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
