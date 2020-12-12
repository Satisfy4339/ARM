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

	if (!command) {
		const noCommand = new Discord.MessageEmbed()
			.setColor('#dc4b4b')
			.setAuthor('Error | This command doesn\'t exist', 'https://i.imgur.com/dOo8hhd.png')
			.setDescription(`Try using \`${prefix}help\` to see existing commands`);

		return message.reply(noCommand)
			.then(msg => {
				msg.delete({ timeout: 6000 });
			});
	}

	if (command.guildOnly && message.channel.type === 'dm') {
		const guildOnlyEmbed = new Discord.MessageEmbed()
			.setColor('#dc4b4b')
			.setAuthor('Error | I can`t run this command inside Dm\'s', 'https://i.imgur.com/dOo8hhd.png')
			.setDescription(`Try using \`${prefix}${command.name} ${command.usage}\` inside a server`);

		return message.reply(guildOnlyEmbed)
			.then(msg => {
				msg.delete({ timeout: 6000 });
			});
	}

	if(command.args && !args.length) {
		const argsEmbed = new Discord.MessageEmbed()
			.setColor('#dc4b4b')
			.setAuthor('Error | You forgot to provide some arguments', 'https://i.imgur.com/dOo8hhd.png')
			.setDescription(`The propper usage would be \`${prefix}${command.name} ${command.usage}\``);

		return message.reply(argsEmbed)
			.then(msg => {
				msg.delete({ timeout: 6000 });
			});
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
			return message.reply(`Please wait \`${timeLeft.toFixed(1)} second(s)\` before using the \`${command.name}\` command.`)
				.then(msg => {
					msg.delete({ timeout: 6000 });
				});
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an issue with executing that command!')
			.then(msg => {
				msg.delete({ timeout: 6000 });
			});
	}
});

client.login(token);