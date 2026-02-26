 const os = require("os");

module.exports = {
  config: {
    name: "up",
    version: "2.2",
    author: "Nabin",
    role: 0,
    shortDescription: "Show bot uptime info",
    longDescription: "Display stylish uptime, system stats, RAM, prefix, threads, etc.",
    category: "system",
    guide: "{pn}"
  },

  onStart: async function ({ message, threadsData }) {
    const uptime = process.uptime();
    const days = Math.floor(uptime / (60 * 60 * 24));
    const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((uptime % (60 * 60)) / 60);
    const seconds = Math.floor(uptime % 60);

    const uptimeString =`
     ✨${days} 𝐝𝐚𝐲𝐬✨
     ✨${hours} 𝐡𝐨𝐮𝐫𝐬✨
     ✨${minutes} 𝐦𝐢𝐧𝐮𝐭𝐞𝐬✨
      ✨${seconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐞𝐬✨`;

    const cpu = os.cpus()[0].model;
    const cores = os.cpus().length;
    const platform = os.platform();
    const arch = os.arch();
    const nodeVersion = process.version;
    const hostname = os.hostname();

    const totalMem = os.totalmem() / 1024 / 1024;
    const freeMem = os.freemem() / 1024 / 1024;
    const usedMem = totalMem - freeMem;

    const prefix = global.GoatBot.config.PREFIX || "#";
    const totalThreads = await threadsData.getAll().then(t => t.length);
    const totalCommands = global.GoatBot.commands.size;

    const line = "".repeat(40);
    const box = `
 ⚙️ 𝐂𝐏𝐔           : ${cpu} (${cores} cores)
 🧠 𝐑𝐀𝐌 𝐔𝐬𝐞𝐝     : ${usedMem.toFixed(2)} MB / ${totalMem.toFixed(2)} MB
 💾 𝐏𝐥𝐚𝐭𝐟𝐨𝐫𝐦𝗺      : ${platform} (${arch})
 🖥️ 𝐇𝐨𝐬𝐭𝐧𝐚𝐦𝐞      : ${hostname}
 ⏱️𝐔𝐏𝐓𝐈𝐌𝐄 : ${uptimeString}
 🔢 𝐓𝐡𝐫𝐞𝐚𝐝𝐬      : ${totalThreads}
 🧩 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬     : ${totalCommands}
 🧪 𝐍𝐨𝐝𝐞.𝐣𝐬       : ${nodeVersion}
 🪄 𝐏𝐫𝐞𝐟𝐢𝐱 : #
 👑 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫     : 𝐒𝐚𝐦𝐢 𝐆𝐞́𝐧𝐢𝐞
`;

    message.reply(box);
  }
};
