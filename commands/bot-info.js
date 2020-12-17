const { MessageEmbed } = require('discord.js');
const { version, library, creator, botInvite, website, supportServer } = require('../config.json');


module.exports = {
	name: 'bot-info',
	aliases: ['bi', 'b-i'],
	cooldown: 3,
	description: 'Gathers information about the Bot',
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

		const embed = new MessageEmbed()
			.setColor('#70c7bc')
			.setAuthor('ARM', client.user.displayAvatarURL({ format: 'png', dynamic: true }))
			.addFields(
				{ name: '**Version:**', value: version, inline: true },
				{ name: '**Library:**', value: library, inline: true },
				{ name: '**Creator:**', value: creator, inline: true },
				{ name: '**Invite:**', value: botInvite, inline: true },
				{ name: '**Website:**', value: website, inline: true },
				{ name: '**Support Server:**', value: supportServer, inline: true },
			)
			.setFooter(`Bot Uptime: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`);
		message.channel.send(embed);
	},
};