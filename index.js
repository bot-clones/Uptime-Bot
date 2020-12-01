require("express")().listen(1343);

const db = require("quick.db"); 
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("NzgyMjUwMDAwOTAxMzQxMjA0.X8JdFQ.rHk27E7zjKQ-j3cqbyc1E1fYgi0");
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return 
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Başarıyla Pinglendi.")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`u!yardım | uptimediscord.ml !!`)
  console.log(`Logined`)
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u!uptime") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("**<a:no1:767698010570227772> Zaten Eklenmiş !!!**")
    
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("**<a:tik4:767698048687669258> Başarılı Bir Şekilde 7/24 Yapıldı !!!**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
     message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("<a:no1:767698010570227772> **Error Yalnızca Mutlak URL'ler Desteklenir.**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
   return message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u!botsay") {
  var link = spl[1]
 message.channel.send(`**${db.get("linkler").length} / 1000**`)
}})




const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "u!yardım") {
let embed = new Discord.RichEmbed()
.setColor('#070706')
.addField(`Discord Uptime Bot Yardım Sistemi`, `Discord Botlarınız Benim Sayemde 7/24 Olacak`)
.setDescription(`**Komutlar**

 🌙 **u!yardım**  | Discord Uptime Botunun Yardım Sistemini Gösterir

 🔋 **u!uptime**  | Botunuzu 7/24 Aktif Tutmak İçin Kullanılan Komut

 ⚡ **u!botsay** | Sistemde Kaç Bot Olduğuna Bakar

`)
.setImage("https://media.discordapp.net/attachments/764866274941075466/783241847731519488/standard.gif")
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`uptimediscord.ml`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})

  const log = message => {
  console.log(`${message}`);
}
  
