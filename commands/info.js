const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer',
};


module.exports = {
	name: 'info',
	aliases: ['i'],
	cooldown: 5,
	usage: '@user',
	description: 'Gathers information about a User',
	args: false,
	category : 'information',
	guildOnly: true,

	execute(client, message) {
		const user = message.mentions.users.first() || message.author;
		const member = message.mentions.members.last() || message.member;
		const userFlags = member.user.flags.toArray();

		let color = member.roles.highest.color;
		if (color == '0') color = '#70c7bc';

		const rolesList = member.roles.cache.sort((b, a) => a.position - b.position || a.id - b.id)
			.filter(r => r.name !== '@everyone').map(role => role).join(' ');

		const embed = new MessageEmbed()
			.setColor(color)
			.setAuthor(user.tag, `${user.displayAvatarURL({ format: 'png', dynamic: true })}`)
			.setDescription(user)
			.setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }) || client.user.displayAvatarURL({ format: 'png', dynamic: true }))
			.addFields(
				{ name: '**Server Join Date:**', value: `${moment(member.joinedAt).format('LL HH:mm:ss [UTC]')}`, inline: true },
				{ name: '**Discord Join Date:**', value: `${moment(user.createdAt).format('LL HH:mm:ss [UTC]')}`, inline: true },
				{ name: '**Badges:**', value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}` },
				{ name: '**Roles:**', value: rolesList },
			)
			.setFooter(`ID: ${member.id}`);
		message.channel.send(embed);
	},
};