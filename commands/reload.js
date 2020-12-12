module.exports = {
	name: 'reload',
	description: 'Reloads a specific command.',
	aliases: ['refresh, r'],
	cooldown: 5,
	args: false,
	category : 'utility',
	guildOnly: true,

	execute(client, message, args) {
		if (!args.length) {
			return message.channel.send(`You didn't pass any command to reload, ${message.author}!`)
				.then(msg => {
					msg.delete({ timeout: 2000 });
				});
		}
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
	|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`)
				.then(msg => {
					msg.delete({ timeout: 2000 });
				});
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
		}
		catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}

		message.channel.send(`Command \`${command.name}\` was reloaded!`)
			.then(msg => {
				msg.delete({ timeout: 2000 });
			});
	},
};