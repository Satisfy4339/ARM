const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	aliases: ['latency'],
	cooldown: 5,
	description: 'Gathers information about the latency of the bot.',
	args: false,
	category : 'utility',
	guildOnly: true,

	execute(client, message) {
		let totalSeconds = (client.uptime / 1000);
		const days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		const hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);

		message.channel.send('📡 | Pinging the bot . . .').then(m => {
			setTimeout(function() {
				const ping = m.createdTimestamp - message.createdTimestamp;
				const api = message.client.ws.ping;

				const embed = new MessageEmbed()
					.setAuthor('Response Time')
					.setDescription(`Bot Latency: \`${ping} ms\`\nAPI Latency: \`${api} ms\``)
					.setColor('#70c7bc')
					.setThumbnail('https://i.imgur.com/bjioQ87.png')
					.setFooter(`Bot Uptime: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`)
					.setTimestamp();

				m.edit('', embed);
			}, 2000);
		});
	},
};