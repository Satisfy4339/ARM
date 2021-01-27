const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    aliases: ['prune'],
	cooldown: 3,
	usage: '@member',
	description: 'Kicks a Member out of the Server.',
	args: true,
	category : 'moderation',
	guildOnly: true,

    
	execute(client, message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const noUserPerms = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | I was unable to Kick ${member}`, 'https://i.imgur.com/dOo8hhd.png')
        .setDescription('You have to have `Kick members` permission to run this command.');

        const noBotPerms = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | I was unable to Kick ${member}`, 'https://i.imgur.com/dOo8hhd.png')
        .setDescription('I am missing the `Kick members`.');

        const notInTheServer = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | This person is not in this server`, 'https://i.imgur.com/dOo8hhd.png');

        const userHigherThanBot = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | I cannot kick this user`, 'https://i.imgur.com/dOo8hhd.png')
        .setDescription(`I can't kick ${member} because they are either a mod/admin or their highest role is higher than mine.`);

        const kickYourself = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | You cannot Kick yourself from the server`, 'https://i.imgur.com/dOo8hhd.png');

        const usedANumber = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | You have to mention a user to kick`, 'https://i.imgur.com/dOo8hhd.png');


        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(noUserPerms).then(msg => {
            msg.delete({ timeout: 6000 });
        });
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(noBotPerms).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        if (!isNaN(args[0])) return message.channel.send(usedANumber).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        if(!member) return message.channel.send(notInTheServer).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        if(member.id === message.author.id) return message.channel.send(kickYourself).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        if(!member.kickable) return message.channel.send(userHigherThanBot).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Unspecified';

        member
        .kick( reason )
        .then(() => {
          
            const kickEmbed = new MessageEmbed()
            .setColor('#e56904')
            .setAuthor(`Successfully kicked ${member.user.tag}`,'https://i.imgur.com/FYwvE4X.png');

            message.channel.send(kickEmbed)
        })
        .catch(err => {
          message.channel.send('I was unable to kick the member');
          console.error(err);
        });

        ;

    }
};