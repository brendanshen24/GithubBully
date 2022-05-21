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
            'marvinirwin', // username
            date.format(new Date(), 'YYYY-MM-DD'),     // --since
            date.format(new Date(), 'YYYY-MM-DD'),             // --until
        );
        const repolist = Array.from(repos)
        if (repolist.length === 0){
            channele.send('<@USERID HERE> fuck you, you lazy ass cunt, you got no work and no bitches done today. how about you get up off your ass and do some work.')

        }
        if (repolist.length >= 1){
            channele.send('<@USERID HERE> good job fuckhead. today, you made contributions to ' + repolist.toString())
        }
    })();
}


client.once("ready", () => {

    let scheduledMessage = new cron.CronJob('00 00 00 * * *', () => {
        const guild = client.guilds.cache.get('SERVER ID');
        const channel = guild.channels.cache.get('TEXT CHANNEL ID');
        checkContributionStatus(guild,channel)
    });
    scheduledMessage.start()
});


client.login('ENTER TOKEN HERE');