const fs = require("fs");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "3.2",
    author: "NTKhang // xnil6x",
    countDown: 5,
    role: 0,
    description: "View command information with enhanced interface",
    category: "info",
    guide: {
      en: "{pn} [command] - View command details\n{pn} all - View all commands\n{pn} c [category] - View commands in category"
    }
  },

  langs: {
    en: {
      helpHeader: " "
                + "  ☃️🎀..𝑺𝑯𝑨𝑫𝑶𝑾..🍯🪄 \n"
                + " ",
      categoryHeader: "\n 🍃✨ {category}🎐🍃 \n",
      commandItem: "🍂✨{name}✨🍂",
      helpFooter: "\n"
                + "",
      commandInfo: "\n"
                 + " 🎀 𝐂𝐌𝐃𝐒 𝐈𝐍𝐅𝐎 🌷\n"
                 + "\n"
                 + " 🏷️ 𝐍𝐚𝐦𝐞: ✨{name}✨\n"
                 + "📝 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: {description}\n"
                 + "📂 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲: {category}\n"
                 + "🔤 𝐀𝐥𝐢𝐚𝐬𝐞𝐬: {aliases}\n"
                 + " 🏷️ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: {version}\n"
                 + " 🔒 𝐏𝐞𝐫𝐦𝐢𝐬𝐬𝐢𝐨𝐧𝐬: {role}\n"
                 + "⏱️ 𝐓𝐄𝐌𝐏𝐒: {countDown}s\n"
                 + "🔧  𝐏𝐫𝐞𝐟𝐢𝐱 𝐮𝐭𝐢𝐥𝐢𝐬𝐞: {usePrefix}\n"
                 + " 👤 𝐀𝐮𝐭𝐞𝐮𝐫: {author}\n"
                 + "",
      usageHeader: " 🛠️ 𝐮𝐬𝐚𝐠𝐞 𝐜𝐦𝐝𝐬",
      usageBody: " {usage}",
      usageFooter: " ",
      commandNotFound: "⚠️ 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 '{command}' 𝐧'𝐞𝐱𝐢𝐬𝐭𝐞 𝐩𝐚𝐬!",
      doNotHave: "𝐍𝐨𝐧𝐞",
      roleText0: "👥 𝐭𝐨𝐮𝐭 𝐥𝐞 𝐦𝐨𝐧𝐝𝐞 ",
      roleText1: "👑 𝐠𝐫𝐨𝐮𝐩𝐞 𝐚𝐝𝐦𝐢𝐧'𝐬",
      roleText2: "⚡ 𝐚𝐝𝐦𝐢𝐧𝐬 𝐛𝐨𝐭 ",
      totalCommands: "📊 𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬: ❄️ {total}\n"
                  + "☃️🎀..𝑺𝑯𝑨𝑫𝑶𝑾..🍯🪄"
    }
  },

  onStart: async function({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);
    const commandName = args[0]?.toLowerCase();
    const bannerPath = path.join(__dirname, "assets", "20250319_111041.png");

    if (commandName === 'c' && args[1]) {
      const categoryArg = args[1].toUpperCase();
      const commandsInCategory = [];

      for (const [name, cmd] of commands) {
        if (cmd.config.role > 1 && role < cmd.config.role) continue;
        const category = cmd.config.category?.toUpperCase() || "GENERAL";
        if (category === categoryArg) {
          commandsInCategory.push({ name });
        }
      }

      if (commandsInCategory.length === 0) {
        return message.reply(`❌ No commands found in category: ${categoryArg}`);
      }

      let replyMsg = this.langs.en.helpHeader;
      replyMsg += this.langs.en.categoryHeader.replace(/{category}/g, categoryArg);

      commandsInCategory.sort((a, b) => a.name.localeCompare(b.name)).forEach(cmd => {
        replyMsg += this.langs.en.commandItem.replace(/{name}/g, cmd.name) + "\n";
      });

      replyMsg += this.langs.en.helpFooter;
      replyMsg += "\n" + this.langs.en.totalCommands.replace(/{total}/g, commandsInCategory.length);

      return message.reply(replyMsg);
    }

    if (!commandName || commandName === 'all') {
      const categories = new Map();

      for (const [name, cmd] of commands) {
        if (cmd.config.role > 1 && role < cmd.config.role) continue;

        const category = cmd.config.category?.toUpperCase() || "GENERAL";
        if (!categories.has(category)) {
          categories.set(category, []);
        }
        categories.get(category).push({ name });
      }

      const sortedCategories = [...categories.keys()].sort();
      let replyMsg = this.langs.en.helpHeader.replace(/{prefix}/g, prefix);
      let totalCommands = 0;

      for (const category of sortedCategories) {
        const commandsInCategory = categories.get(category).sort((a, b) => a.name.localeCompare(b.name));
        totalCommands += commandsInCategory.length;

        replyMsg += this.langs.en.categoryHeader.replace(/{category}/g, category);

        commandsInCategory.forEach(cmd => {
          replyMsg += this.langs.en.commandItem.replace(/{name}/g, cmd.name) + "\n";
        });

        replyMsg += this.langs.en.helpFooter;
      }

      replyMsg += "\n" + this.langs.en.totalCommands.replace(/{total}/g, totalCommands);

      try {
        if (fs.existsSync(bannerPath)) {
          return message.reply({
            body: replyMsg,
            attachment: fs.createReadStream(bannerPath)
          });
        } else {
          return message.reply(replyMsg);
        }
      } catch (e) {
        console.error("Couldn't load help banner:", e);
        return message.reply(replyMsg);
      }
    }

    let cmd = commands.get(commandName) || commands.get(aliases.get(commandName));
    if (!cmd) {
      return message.reply(this.langs.en.commandNotFound.replace(/{command}/g, commandName));
    }

    const config = cmd.config;
    const description = config.description?.en || config.description || "No description";
    const aliasesList = config.aliases?.join(", ") || this.langs.en.doNotHave;
    const category = config.category?.toUpperCase() || "GENERAL";

    let roleText;
    switch(config.role) {
      case 1: roleText = this.langs.en.roleText1; break;
      case 2: roleText = this.langs.en.roleText2; break;
      default: roleText = this.langs.en.roleText0;
    }

    let guide = config.guide?.en || config.usage || config.guide || "No usage guide available";
    if (typeof guide === "object") guide = guide.body;
    guide = guide.replace(/\{prefix\}/g, prefix).replace(/\{name\}/g, config.name).replace(/\{pn\}/g, prefix + config.name);

    let replyMsg = this.langs.en.commandInfo
      .replace(/{name}/g, config.name)
      .replace(/{description}/g, description)
      .replace(/{category}/g, category)
      .replace(/{aliases}/g, aliasesList)
      .replace(/{version}/g, config.version)
      .replace(/{role}/g, roleText)
      .replace(/{countDown}/g, config.countDown || 1)
      .replace(/{usePrefix}/g, typeof config.usePrefix === "boolean" ? (config.usePrefix ? "✅ Yes" : "❌ No") : "❓ Unknown")
      .replace(/{author}/g, config.author || "Unknown");

    replyMsg += "\n" + this.langs.en.usageHeader + "\n" +
                this.langs.en.usageBody.replace(/{usage}/g, guide.split("\n").join("\n ")) + "\n" +
                this.langs.en.usageFooter;

    return message.reply(replyMsg);
  }
};
