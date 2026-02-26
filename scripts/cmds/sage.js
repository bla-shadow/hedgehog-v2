 const fs = require('fs');

module.exports = {
 config: {
 name: "sage",
 aliases: ["sg","file"],
 version: "1.0",
 author: "NZR",
 countDown: 5,
 role: 0,
 description: "extract file",
 category: "owner",
 guide: "{pn} Write a file name"
 },

 onStart: async function ({ message, args, api, event }) {
 const permission = ["100079347704626"];
 if (!permission.includes(event.senderID)) {
 return api.sendMessage("☃️🎀..𝑺𝑯𝑨𝑫𝑶𝑾..🍯🪄\n◆━━━━━━━▣✦▣━━━━━━━━◆\n 𝐢𝐝𝐨𝐢𝐭 𝐭'𝐚𝐬 𝐩𝐚𝐬 𝐥'𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐮𝐭𝐢𝐥𝐢𝐬𝐞 𝐜𝐞𝐭𝐭𝐞 𝐜𝐦𝐝.🤷🎀\n◆━━━━━━━▣✦▣━━━━━━━━◆", event.threadID, event.messageID);

 }

 const fileName = args[0];
 if (!fileName) {
 return api.sendMessage("?", event.threadID, event.messageID);
 }

 const filePath = __dirname + `/${fileName}.js`;
 if (!fs.existsSync(filePath)) {
 return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
 }

 const fileContent = fs.readFileSync(filePath, 'utf8');
 api.sendMessage({ body: fileContent }, event.threadID);
 }
};
