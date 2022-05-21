import date from 'date-and-time';
import {Client,Intents} from 'discord.js'
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
import cron from 'cron'
import githubContribs from '@ghuser/github-contribs'


const checkContributionStatus = (guild,channel) => {
    const guilde = guild
    const channele = channel;
    (async () => {
        const repos = await githubContribs.fetch(
            'ENTER GITHUB USERNAME HERE', // username
            date.format(new Date(), 'YYYY-MM-DD'),     // --since
            date.format(new Date(), 'YYYY-MM-DD'),             // --until
        );
        const repolist = Array.from(repos)
        if (repolist.length === 0){
            channele.send('<@USERID HERE> Do some work')

        }
        if (repolist.length >= 1){
            channele.send('<@USERID HERE> good job. today, you made contributions to ' + repolist.toString())
        }
    })();
}


client.once("ready", () => {

    let scheduledMessage = new cron.CronJob('00 00 00 * * *', () => {//24 hour time, in time zone of client. formatted as 00 MIN HOUR
        const guild = client.guilds.cache.get('SERVER ID');
        const channel = guild.channels.cache.get('TEXT CHANNEL ID');
        checkContributionStatus(guild,channel)
    });
    scheduledMessage.start()
});


client.login('ENTER TOKEN HERE');