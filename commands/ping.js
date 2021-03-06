const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	aliases: ['latency'],
	cooldown: 5,
	usage: ' ',
	description: 'Gathers information about the latency of the bot.',
	args: false,
	category : 'utility',
	guildOnly: true,

	execute(client, message) {
		message.channel.send('📡 | Pinging the bot . . .').then(m => {
			setTimeout(function() {
				const ping = m.createdTimestamp - message.createdTimestamp;
				const api = message.client.ws.ping;

				const embed = new MessageEmbed()
					.setAuthor('Response Time', 'https://i.imgur.com/FycH6y3.png')
					.setDescription(`Bot Latency: \`${ping} ms\`\nAPI Latency: \`${api} ms\``)
					.setColor('#70c7bc');

				m.edit('', embed);
			}, 2000);
		});
	},
};