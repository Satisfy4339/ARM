const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const cooldowns = new Discord.Collection();
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');

const commandFiles = fs
	.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Bot is now Online!');
	console.log('Prefix for ARM is:', prefix);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
	|| client.commands.find(commands => commands.aliases && commands.aliases.includes(commandName));

	if (!command) return;

	if(command.args && !args.length) {
		const embed = createEmbed({
			color: '#dc4b4b',
			author: 'Error | You forgot to provide some arguments',
			description: `The propper usage would be \`${prefix}${command.name} ${command.usage}\``,
		});

		return message.channel.send(embed);
	}
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Please wait \`${timeLeft.toFixed(1)} second(s)\` before using the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

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
	const { color, author, description } = params;
	const embed = new Discord.MessageEmbed()
		.setColor(color)
		.setAuthor(author, 'https://i.imgur.com/dOo8hhd.png')
		.setDescription(description);
	return embed;
};

client.login(token);