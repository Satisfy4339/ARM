const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Bot Ping',
	cooldown: 3,
	args: false,
	aliases: ['latency'],
	category: 'utility',
	guildOnly: false,

	execute(client, message) {
		message.channel.send('📡 | Pinging the bot . . .').then(m => {
			setTimeout(function() {
				const ping = m.createdTimestamp - message.createdTimestamp;
				const api = message.client.ws.ping;

				const embed = new MessageEmbed()
					.setAuthor('Bot Latency')
					.setDescription(`Bot Latency: \`${ping} ms\`\nAPI Latency: \`${api} ms\``)
					.setColor('#70c7bc')
					.setThumbnail('https://i.imgur.com/bjioQ87.png');

				m.edit('', embed);
			}, 2000);
		});
	},
};