const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'args-info',
	description: 'Gives you information about imputed arguments.',
	cooldown: 3,
	args: true,
	aliases: ['ai', 'a-i', 'args_info', 'a_i'],
	usage: 'message',
	category: 'fun',
	guildOnly: true,

	execute(client, message, args) {
		const userIcon = message.author.displayAvatarURL();
		const userName = message.author.username;
		const exampleEmbed = new MessageEmbed()
			.setColor('#70c7bc')
			.setTitle('Argument Info')
			.setDescription(`Message: \`${args}\` \nNumber of Arguments: \`${args.length}\``)
			.setFooter((userName), (userIcon));

		message.channel.send(exampleEmbed);
	},

};