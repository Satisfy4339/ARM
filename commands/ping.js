const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Bot Ping',
	args: false,
	execute(message) {
		message.channel.send('Pinging . . .').then(m => {
			const ping = m.createdTimestamp - message.createdTimestamp;

			const embed = new MessageEmbed()
				.setAuthor(`My ping is ${ping} ms`, 'https://i.imgur.com/FycH6y3.png')
				.setColor('#70c7bc');

			m.edit('', embed);
		});
	},
};