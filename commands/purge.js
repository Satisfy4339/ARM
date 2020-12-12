const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'purge',
	description: 'Cleares the chat',
	cooldown: 5,
	args: true,
	aliases: ['p, clear'],
	category: 'moderation',
	guildOnly: true,

	execute(client, message, args) {
		if (message.deletable) {
			message.delete();
		}

		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			const noPerms = new MessageEmbed()
				.setColor('#dc4b4b')
				.setAuthor('Error | You don\'t have permission to use this command!', 'https://i.imgur.com/dOo8hhd.png')
				.setDescription('This command can only be used by members with `Manage Messages` permission');

			return message.reply(noPerms)
				.then(msg => {
					msg.delete({ timeout: 6000 });
				});
		}

		if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
			const noNumber = new MessageEmbed()
				.setColor('#dc4b4b')
				.setAuthor('Error | You didn\'t provide a number or you used a `0`.', 'https://i.imgur.com/dOo8hhd.png')
				.setDescription('This command can only be used by members with `Manage Messages` permission');

			return message.reply(noNumber)
				.then(msg => {
					msg.delete({ timeout: 6000 });
				});
		}

		if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
			const noBotPerms = new MessageEmbed()
				.setColor('#dc4b4b')
				.setAuthor('Error | I don\'t have permission to delete messages', 'https://i.imgur.com/dOo8hhd.png')
				.setDescription('I am missing the `Manage Messages` permission');

			return message.reply(noBotPerms)
				.then(msg => {
					msg.delete({ timeout: 6000 });
				});
		}
		let deleteAmount;

		if (parseInt(args[0]) > 100) {
			deleteAmount = 100;
		}
		else {
			deleteAmount = parseInt(args[0]);
		}

		const messageDeleted = new MessageEmbed()
			.setColor('#14a363')
			.setAuthor('Success | Messages Deleted', 'https://i.imgur.com/wz0MPNN.png')
			.setDescription(`Succesfully deleted \`${deleteAmount}\` messages`);
		const messageNotDeleted = new MessageEmbed()
			.setColor('#dc4b4b')
			.setAuthor('Error | I don\'t have permission to delete messages', 'https://i.imgur.com/dOo8hhd.png')
			.setDescription('I am missing the `Manage Messages` permission');

		try {
			message.channel.bulkDelete(deleteAmount, true)
				.then(msg => {
					msg.delete({ timeout: 4000 });
				});
			message.channel.send(messageDeleted)
				.then(msg => {
					msg.delete({ timeout: 4000 });
				});
		}
		catch (error) {
			console.error(error);
			message.channel.send(messageNotDeleted);
		}
	},
};