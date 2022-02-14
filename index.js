console.log("Starter...");
require('dotenv').config();

const { Discord, Client, Intents } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.BOT_TOKEN;

const rest = new REST({ version: '9' }).setToken(token);

const svar = async (tekst) => {
    try {
      console.log('Trying to reply.');
  
      await rest.post(
        Routes.channelMessages('211543363168501771'),
        { body: 
            {
                "content": tekst
            }
        },
      );
  
      console.log('Successfully replied.');
    } catch (error) {
      console.error(error);
    }
};


const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', () => {
    console.log('bot is ready.');
    
})

client.on('interactionCreate', interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
});

client.on('messageCreate', idk => {
    if(idk.author.id !== process.env.BOT_UID){
        console.log(idk.author.id);
        if(idk.content.toLowerCase().includes('hei')){
                svar("heisann!");
        }
    }
})

client.login(token);