const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Bot Ping',
	args: false,
	category: 'utilities',
	execute(message) {
		message.channel.send('Pinging . . .').then(m => {
			const ping = m.createdTimestamp - message.createdTimestamp;
			const api = message.client.ws.ping;

			const embed = new MessageEmbed()
				.setAuthor('Bot Latency', 'https://i.imgur.com/FycH6y3.png')
				.setDescription(`Bot Latency: \`${ping} ms\`\nAPI Latency: \`${api} ms\``)
				.setColor('#70c7bc');

			m.edit('', embed);
		});
	},
};