const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: ['leave'],
	cooldown: 3,
	usage: '@member',
	description: 'Bans a Member from the Server.',
	args: true,
	category : 'moderation',
	guildOnly: true,

    
	execute(client, message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const noUserPerms = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | I was unable to Ban ${member}`, 'https://i.imgur.com/dOo8hhd.png')
        .setDescription(`You have to have \`Ban members\` permission to run this command.`);

        const noBotPerms = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor(`Error | I was unable to Ban ${member}`, 'https://i.imgur.com/dOo8hhd.png')
        .setDescription(`I am missing the \`Ban members\`.`);

        const notInTheServer = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor('Error | This person is not in this server', 'https://i.imgur.com/dOo8hhd.png');

        const userHigherThanBot = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor('Error | I cannot Ban this user', 'https://i.imgur.com/dOo8hhd.png')
        .setDescription(`I can't Ban ${member} because they are either a mod/admin or their highest role is higher than mine.`);

        const banYourself = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor('Error | You cannot Ban yourself from the server', 'https://i.imgur.com/dOo8hhd.png');

        const usedANumber = new MessageEmbed()
        .setColor('#dc4b4b')
        .setAuthor('Error | You have to mention a user to Ban', 'https://i.imgur.com/dOo8hhd.png');


        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(noUserPerms).then(msg => {
            msg.delete({ timeout: 6000 });
        });
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(noBotPerms).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        if (!isNaN(args[0])) return message.channel.send(usedANumber).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        if(!member) return message.channel.send(notInTheServer).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        if(member.id === message.author.id) return message.channel.send(banYourself).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        if(!member.bannable) return message.channel.send(userHigherThanBot).then(msg => {
            msg.delete({ timeout: 6000 });
        });

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Undefined';

        member
        .ban({ days: 0, reason: `${reason}` })
        .then(() => {
        
            const BanEmbed = new MessageEmbed()
                    .setColor('#e56904')
                    .setAuthor(`Successfully Baned ${member.user.tag}`,'https://i.imgur.com/FYwvE4X.png');
        
                message.channel.send(BanEmbed);
        })
        .catch(err => {
          message.channel.send('I was unable to Ban the member');
          console.error(err);
        });

        ;

    }
};