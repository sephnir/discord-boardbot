import { Client } from "discord.js";
import { config } from "dotenv";
import { manage, sendInst } from "./factory";

const client = new Client();
config();

const token = process.env.API_TOKEN;
const prefix = process.env.PREFIX;
const botId = process.env.BOT_ID;

client.once("ready", () => {
	console.log("Ready!");
});

client.on("message", message => {
	if (message.content.charAt(0) != prefix) {
		return;
	}

	if (message.author.id == botId) {
		return;
	}

	message.content = message.content.replace(prefix, "");
	let gameInst = manage(message);
	sendInst(message.channel, gameInst);
});

client.login(token);
