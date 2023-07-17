const Discord = require("discord.js"),
  client = new Discord.Client(),
  nodeHtmlToImage = require("node-html-to-image"),
  config = require("./config.json"),
  puppeteer = require("puppeteer"),
  express = require("express"),
  app = express();
var mime = require("mime"),
  fs = require("fs"),
  path = require("path");
const port = 3e3;
async function nitrogenerator(e, t) {
  let a = getUTCHours(new Date());
  let n = getUTCHours(new Date(Date.now() - 6e4)),
    o = await fs.readFileSync(`${__dirname}/testing.html`, "utf8");
  (datatosend = o),
    (datatosend = datatosend.replace(
      "FIRSTAUTHORURL",
      e.author.displayAvatarURL()
    )),
    (datatosend = datatosend.replace("THEFIRSTAUTHOR", e.author.username)),
    (datatosend = datatosend.replace(
      "SECONDAUTHORURL",
      (client.users.cache.get("853250437566169109").displayAvatarURL())
    )),
    (datatosend = datatosend.replace("THESECONDAUTHOR", t.shift())),
    (datatosend = datatosend.replace("RESPONSETONITRO", t.join(" "))),
    (datatosend = datatosend.replace("FIRSTAUTHORDATE", "Aujourd’hui à " + n)),
    (datatosend = datatosend.replace("SECONDAUTHORDATE", "Aujourd’hui à " + a)),
    app.get("/font", function(e, t) {
      const a = `${__dirname}/Whitneyfont.woff`;
      t.sendFile(a);
    }),
    app.get("/", function(e, t) {
      t.send(datatosend);
    });
  let r = app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    console.count('Nombres');
Nombres: 1
  });
  const s = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    }),
    i = await s.newPage();
  await i.goto(`http://localhost:${port}`),
    await i.waitForSelector(".scrollerInner-2YIMLh");
  const d = await i.$(".scrollerInner-2YIMLh");
  let c = await d.screenshot({ type: "png" });
  await s.close();
  const l = new Discord.MessageAttachment(c, "NitroProof.png");
  e.channel.send(`${e.author}`, l), r.close();
}
function getUTCHours(e) {
  var t = e.getHours(),
    a = e.getMinutes(),
    n = t >= 24 ? "" : "";
  return (t = (t %= 24) || 24) + ":" + (a = a < 10 ? "0" + a : a) + " " + n;
}
client.on("ready", () => {
  function randomStatus() {
    let status = [
      "Made by database.",
    ]; 
    let rstatus = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[rstatus], {
      type: "STREAMING",
      url: "https://www.twitch.tv/database"
    });
  }
  setInterval(randomStatus, 5000); 

  console.log("Nitro classic is running");
});

  client.on("message", async e => {
    if ("dm" === e.channel.type) return;
    if (e.author.bot) return;
    if (0 !== e.content.indexOf(config.prefix)) return;
    const t = e.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g);
    "basic" === t.shift().toLowerCase() && (await nitrogenerator(e, t));
  }),
  client.login(config.token);