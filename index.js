console.log("Starter...");
require('dotenv').config();

const { Discord, Client, GatewayIntentBits } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.BOT_TOKEN;

if(!token){
  throw new Error("No bot-token provided.");
}

const rest = new REST({ version: '9' }).setToken(token);

// const svar = async (tekst) => {
//     try {
//       console.log('Trying to reply.');
  
//       await rest.post(
//         Routes.channelMessages('211543363168501771'),
//         { body: 
//             {
//                 "content": tekst
//             }
//         },
//       );
  
//       console.log('Successfully replied.');
//     } catch (error) {
//       console.error(error);
//     }
// };


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('bot is ready.');
    
})

client.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
  if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Username: ${interaction.user.username}\nTag: ${interaction.user.tag}\nIs bot? ${interaction.user.bot}\nUser created: ${interaction.user.createdAt}\nProfile picture URL: <${interaction.user.defaultAvatarURL}>`);
	}
});

// client.on('messageCreate', message => {
//   console.log('messageCreate...', message.author.id, process.env.CLIENT_ID);
  
//     if(message.author.id !== process.env.CLIENT_ID){
//         console.log(message);
//         if(message.content.toLowerCase().includes('hei')){
//           svar("heisann!");
//         } else if (message.content.toLowerCase().includes('updateAllCommands')){
//           updateAllCommands()
//         }
//     }
// })

client.login(token);