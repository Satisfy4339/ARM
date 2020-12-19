const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	aliases: ['commands'],
	usage: 'commandName',
	cooldown: 5,
	description: 'Lists all of my commands or info about a specific command.',
	args: false,
	category : 'utility',
	guildOnly: true,

	execute(client, message, args) {
		const { commands } = message.client;
		if (!args.length) {
			let util = '', fun = '';
			let mod = '', oth = '';
			let inf = '';
			client.commands.forEach(cmd => {
				if(cmd.category === 'utility') util += cmd.name + ', ';
				else if(cmd.category === 'moderation') mod += cmd.name + ', ';
				else if(cmd.category === 'other') oth += cmd.name + ', ';
				else if(cmd.category === 'fun') fun += cmd.name + ', ';
				else if(cmd.category === 'information') inf += cmd.name + ', ';
			});

			const cmdEmbed = new MessageEmbed()
				.setColor('#70c7bc')
				.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
				.setTitle('Available Commads')
				.setDescription(`You can send \`${prefix}help [command name]\` to get info on a specific command! \n\n**<argument>** This means the argument is required. \n**[argument]** This means the argument is option. \n**[ A | B ]** This means the it can be either A or B. \n*__You do not type in the brackets!__*`)
				.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }) || client.user.displayAvatarURL({ format: 'png', dynamic: true }))
				.addFields(
					{ name: '• Utility', value : `\`\`\`${util || 'comming soon'}\`\`\``, inline : true },
					{ name: '• Mod', value : `\`\`\`${mod || 'comming soon'}\`\`\``, inline : true },
					{ name: '• Other', value : `\`\`\`${oth || 'comming soon'}\`\`\``, inline : true },
					{ name: '• Fun', value : `\`\`\`${fun || 'comming soon'}\`\`\``, inline :true },
					{ name: '• Information', value : `\`\`\`${inf || 'comming soon'}\`\`\``, inline :true },
				);

			return message.channel.send(cmdEmbed);
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		const cmdName = [], cmdAliases = [], cmdUsage = [], cmdCooldown = [], cmdDescription = [];

		cmdName.push(`**Name : ** \`${command.name}\``);

		if (command.aliases) cmdAliases.push(`${command.aliases.join(' | ')}`);
		if (command.description) cmdDescription.push(`${command.description}`);
		if (command.usage) cmdUsage.push(`${prefix}${command.name} ${command.usage}`);

		cmdCooldown.push(`${command.cooldown || 3} seconds`);

		const commandEmbed = new MessageEmbed()
			.setColor('#70c7bc')
			.setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setTitle(cmdName)
			.setDescription(`${cmdDescription || 'NO DESCRIPTION'}`)
			.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }) || client.user.displayAvatarURL({ format: 'png', dynamic: true }))
			.addFields(
				{ name: '• Command Aliases:', value : `\`${cmdAliases || 'NO KNOWN ALIASES'}\``, inline : false },
				{ name: '• Command Usage:', value : `\`\`\`${cmdUsage || 'NO KNOWN USAGE'}\`\`\``, inline : false },
				{ name: '• Command Cooldown:', value : `*${cmdCooldown || 'NO COOLDOWN'}*`, inline : false },
			);
		message.channel.send(commandEmbed);
	},
};
