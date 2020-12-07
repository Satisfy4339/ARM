module.exports = {
	name: 'ping',
	description: 'Bot Ping',
	args: false,
	execute(message) {
		message.channel.send('If you are reading this then I am online.');
	},
};