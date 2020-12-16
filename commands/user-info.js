const { MessageEmbed } = require('discord.js');
const moment = require('moment');


module.exports = {
	name: 'user-info',
	aliases: ['ui', 'u-i'],
	cooldown: 5,
	usage: '@user',
	description: 'Gathers information about a User',
	args: false,
	category : 'moderation',
	guildOnly: true,

	execute(client, message) {
		const user = message.mentions.users.first() || message.author;
		const member = message.mentions.members.last() || message.member;

		let color = member.roles.highest.color;
		if (color == '0') color = '#70c7bc';

		const rolesList = member.roles.cache.sort((b, a) => a.position - b.position || a.id - b.id)
			.filter(r => r.name !== '@everyone').map(role => role).join(' ');

		const embed = new MessageEmbed()
			.setColor(color)
			.setAuthor(user.tag, `${user.displayAvatarURL({ format: 'png', dynamic: true })}`)
			.setDescription(`** Mention:** ${user} \n** ID:** ${member.id}`)
			.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }) || client.user.displayAvatarURL({ format: 'png', dynamic: true }))
			.addFields(
				{ name: '** Roles:**', value: rolesList },
				{ name: '** Server Join Date:**', value: `\`${moment(member.joinedAt).format('LL LTS')}\``, inline: true },
				{ name: '** Discord Join Date:**', value: `\`${moment(user.createdAt).format('LL LTS')}\``, inline: true },
			);
		message.channel.send(embed);
	},
};