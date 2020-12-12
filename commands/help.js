const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Lists all of my commands or info about a specific command.',
	aliases: ['commands'],
	cooldown: 5,
	args: false,
	category : 'utility',
	guildOnly: true,

	execute(client, message) {
		let util = '', fun = '';
		let mod = '', oth = '';
		client.commands.forEach(cmd => {
			if(cmd.category === 'utility') util += cmd.name + ', ';
			else if(cmd.category === 'moderation') mod += cmd.name + ', ';
			else if(cmd.category === 'other') oth += cmd.name + ', ';
			else if(cmd.category === 'fun') fun += cmd.name + ', ';
		});

		const cmdEmbed = new MessageEmbed()
			.setColor('#70c7bc')
			.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setTitle('Available Commads')
			.setDescription('Here is list of all available commands based on category')
			.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }) || client.user.displayAvatarURL({ format: 'png', dynamic: true }))
			.addFields(
				{ name: '• Utility', value : `\`${util || 'comming soon'}\``, inline : true },
				{ name: '• Mod', value : `\`${mod || 'comming soon'}\``, inline : true },
				{ name: '• Other', value : `\`${oth || 'comming soon'}\``, inline : true },
				{ name: '• Fun', value : `\`${fun || 'comming soon'}\``, inline :true },
			);

		return message.channel.send(cmdEmbed);
	},
};
