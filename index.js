const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

const { prefix, token } = require('./config.json');

client.once('ready', () => {
	console.log('Bot is now Online!');
	console.log('Prefix for ARM is:', prefix);
});

client.login(token);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);

	if(command.args && !args.length) {
		const embed = createEmbed({
			color: '#fc5a74',
			author: 'Error',
			description: 'You forgot to provide enough arguments.',
			footer: 'Error Message',
			thumbnail: 'https://i.imgur.com/1FI1Elb.gif',
		});

		createEmbed(embed, message);
		return message.channel.send(embed);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an issue with executing that command!');
	}
});

/**
 * Create embed function
 */
const createEmbed = params => {
	const { color, author, description, footer, thumbnail } = params;
	const embed = new Discord.MessageEmbed()
		.setColor(color)
		.setAuthor(author)
		.setDescription(description)
		.setFooter(footer)
		.setThumbnail(thumbnail);
	return embed;
};

client.login(token);