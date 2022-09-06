console.log("Starter...");
require('dotenv').config();

const { Discord, Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const questions = require('./questions.json')

const token = process.env.BOT_TOKEN;

if(!token){
  throw new Error("No bot-token provided.");
}

const rest = new REST({ version: '9' }).setToken(token);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('bot is ready.');
    
})

client.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
  if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

	const { commandName } = interaction;

	if (commandName === 'start') {
		const filter = i => ['alternativeA', 'alternativeB', 'alternativeC'].includes(i.customId);

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
		var responded = new Map();
		collector.on('collect', async i => {
			responded.set(i.user.tag, i.customId);
			var respondedString = "";
			responded.forEach((val, key, map) => {
				respondedString = respondedString + ' ' + key;
			});
			await i.update({ content: "Responded: " + respondedString });
		});
		var buttons = {
			alternativeA: new ButtonBuilder()
				.setCustomId('alternativeA')
				.setLabel(questions[0].A[0])
				.setStyle(ButtonStyle.Primary),
			alternativeB: new ButtonBuilder()
				.setCustomId('alternativeB')
				.setLabel(questions[0].A[1])
				.setStyle(ButtonStyle.Primary),
			alternativeC: new ButtonBuilder()
				.setCustomId('alternativeC')
				.setLabel(questions[0].A[2])
				.setStyle(ButtonStyle.Primary),
		}
		
		collector.on('end', collected => { console.log(`Collected ${collected.size} items`) });
		const row = new ActionRowBuilder()
		.addComponents(buttons.alternativeA, buttons.alternativeB, buttons.alternativeC);
		await interaction.reply({ content: questions[0].Q, components: [row] });
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Username: ${interaction.user.username}\nTag: ${interaction.user.tag}\nIs bot? ${interaction.user.bot}\nUser created: ${interaction.user.createdAt}\nProfile picture URL: <${interaction.user.defaultAvatarURL}>`);
	}
});


client.login(token);