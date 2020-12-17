const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'prefix',
	aliases: ['symbol'],
	usage: ' ',
	cooldown: 5,
	description: 'Shows the bot\'s prefix.',
	args: false,
	category : 'utility',
	guildOnly: true,

	execute(client, message) {
		const userIcon = message.author.displayAvatarURL();
		const userName = message.author.username;
		const prefixEmbed = new MessageEmbed()
			.setColor('#70c7bc')
			.setTitle('Bot Prefix')
			.setDescription(`Prefixes for the bot are:  \`${prefix}\` | \`${prefix.toLowerCase()}\``)
			.setFooter((userName), (userIcon));

		message.channel.send(prefixEmbed);
	},
};