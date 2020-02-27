import Snake from "./games/snake_and_ladder";
import { Attachment } from "discord.js";
import { draw } from "./graphics";
import DB from "./db";

var db = new DB();

const stopRoute = "quit";
const routes = [
	{
		name: "Snake and Ladder",
		command: "snake",
		class: Snake
	}
];

export class manager {
	commands;
	message;

	constructor(message) {
		this.message = message;
		this.commands = message.content.split(" ");

		if (this.commands[0] === stopRoute) {
			db.deleteOne(message.channel.id);
			sendText(message.channel, "The current session has stopped.");
			return;
		}
		db.find(message.channel.id, this.manageCallback);
	}

	manageCallback = async gameInst => {
		for (let i = 0; i < routes.length; i++) {
			if (this.commands[0] === routes[i].command) {
				if (!gameInst) {
					gameInst = new routes[i].class(
						routes[i].command,
						this.message.channel.id,
						this.message.mentions.users.array()
					);
					let message = `A new game has started!`;
					sendText(this.message.channel, message);
					break;
				} else {
					sendText(
						this.message.channel,
						`There is currently a game in progress. Use \`^${stopRoute}\` to stop the current session before starting another one.`
					);
				}
			}
		}

		gameInst = restore(gameInst);
		let msg = gameInst.route(this.commands, this.message.author);
		db.replaceOne(gameInst);
		this.fetchBuffer(gameInst, msg);
	};

	async fetchBuffer(gameInst, msg) {
		let buffer = await draw(gameInst);
		sendAttachment(this.message.channel, buffer, msg);
	}
}

export function sendText(channel, text) {
	channel.send(text);
}

export function sendAttachment(channel, buffer, text) {
	const attachment = new Attachment(buffer, "game.png");
	channel.send(text, attachment);
}

export function restore(jsonInst) {
	//let jsonInst = JSON.parse(stringifiedInst);
	let classPtt;
	for (let route of routes) {
		if (route.command === jsonInst.type) {
			classPtt = route.class;
		}
	}

	if (!classPtt) return;
	let inst = Object.assign(new classPtt(), jsonInst);
	inst.restore();

	return inst;
}
