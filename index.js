const mineflayer = require('mineflayer')
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const stuff = require('data-store')({ path: process.cwd() + '/jd.json' });
const stuff2 = require('data-store')({ path: process.cwd() + '/jd2.json' });
const msgs = require('data-store')({ path: process.cwd() + '/msgs.json' });
const login = require('data-store')({ path: process.cwd() + '/login.json' });
const leaves = require('data-store')({ path: process.cwd() + '/leaves.json' });
const faq = require('data-store')({ path: process.cwd() + '/faq.json' });
const talkedRecently = new Set();

const bot = mineflayer.createBot({
  host: '192.168.0.3', // minecraft server ip
  username: email, // minecraft username
  password: password, // minecraft password, comment out if you want to log into online-mode=false servers
  port: 25565,                // only set if you need a port that isn't 25565
  version: "1.16.5",             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // auth: 'mojang'              // only set if you need microsoft auth, then set this to 'microsoft'
})


bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: false }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
//  if (talkedRecently.has(username)) return
  if(message.startsWith('!op')){
    talkedRecently.add(username);
    setTimeout(() => {talkedRecently.delete(username);}, 10000);
      bot.chat('The server has now oped ' + username)
  }else if(message.startsWith('!report')){
    talkedRecently.add(username);
    setTimeout(() => {talkedRecently.delete(username);}, 10000);
  reports = message.replace("!report ","")
  bot.chat(reports + ' Has been reported.')
  }else if(message.startsWith('!help')){
    talkedRecently.add(username);
    setTimeout(() => {talkedRecently.delete(username);}, 10000);
      bot.chat('/w ' + username + ' here is the commands website: https://willmoto.com/commands/')
  }else if(message.startsWith('!rules')){
    talkedRecently.add(username);
    setTimeout(() => {talkedRecently.delete(username);}, 10000);
      bot.chat('/w ' + username + ' here are the rules: https://willmoto.com/commands/rules/')
  }else if(message.startsWith('!jd')){
    talkedRecently.add(username);
    setTimeout(() => {talkedRecently.delete(username);}, 10000);
      removed = message.replace("!jd ", "")
      bot.chat(removed + "'s join date is " + new Date(stuff.get('jd.' + removed)))
  }else if(message.startsWith(`!coords`)) {
    talkedRecently.add(username);
    setTimeout(() => {talkedRecently.delete(username);}, 10000);
    bot.chat('my coords are X: ' + bot.entity.position.x + ' Y: ' + bot.entity.position.y + ' Z: ' + bot.entity.position.z);
  }else if(message.startsWith('!info')) {
      if (username === 'Moto2007'){
          bot.chat('Hello world I am a robot beep boop you can see my commands on !help')
      }
      else return
  }else if(message.startsWith('!twitch')){
    talkedRecently.add(username);
    setTimeout(() => {talkedRecently.delete(username);}, 10000);    
      bot.chat('/w ' + username + ' Watch me on twitch! https://www.twitch.tv/motothemcs')
  }else if(message.startsWith('!addfaq')){
      faqvar = message.replace("!addfaq ", "")
    faq.set('faq.' + username, faqvar)
    bot.chat('/w ' + username + ' faq added')
  }else if(message.startsWith('!faq')){
      faqvar2 = message.replace("!faq ", "")
      faqvar3 = faq.get('faq.' + faqvar2)
      if (faqvar3 === undefined){
          bot.chat('invalid player or no faq')
      }else{bot.chat(faq.get('faq.' + faqvar2) + ' | theres the faq')}
  }
})

bot.on('playerJoined', (player) => {
    if (stuff.get('jd.' + player.username) == null){
      stuff.set('jd.' + player.username, Date.now());
    }
    else
       stuff2.set('jd.' + player.username + '.jd2.' + Date.now(), Date.now());
  })


  bot.on('playerLeft', (player) => {
       leaves.set('jd.' + player.username + '.jd2.' + Date.now(), Date.now());
  })

  bot.on('chat', (username, message) => {
      msgs.set('msgs.' + username + '.' + Date.now(), message)
  })

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)