import { Client } from "discord.js";
import { config } from "dotenv";
import { manager } from "./factory";

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
	try {
		message.content = message.content.replace(prefix, "");
		new manager(message);
	} catch (err) {
		errorHandling(message.channel, err);
	}
});

client.login(token);

function errorHandling(channel, error) {
	channel.send("Error: " + error);
}
