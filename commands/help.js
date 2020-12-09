const { MessageEmbed } = require('discord.js');


module.exports = {
	name: 'help',
	description: 'Lists all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '<command name>',
	cooldown: 5,
	args: false,
	category : 'utilities',

	execute(message) {
		message.channel.send('Gathering Information from Storage').then(m => {
			const serverIcon = message.guild.iconURL();
			const userIcon = message.author.displayAvatarURL();
			const userName = message.author.username;

			const embed = new MessageEmbed()
				.setColor('#70c7bc')
				.setAuthor((userName), (userIcon))
				.setThumbnail(serverIcon)
				.setTitle('Here is a list of my commands');

			m.edit('', embed);
		});
	},
};
