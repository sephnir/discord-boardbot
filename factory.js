import Snake from "./games/snake_and_ladder";
import { Attachment } from "discord.js";
import { draw } from "./graphics";
import DB from "./db";

const stopRoute = "quit";
const routes = [
	{
		name: "Snake and Ladder",
		command: "snake",
		class: Snake
	}
];

export function manage(message) {
	var db = new DB();

	let commands = message.content.split(" ");
	let type = commands[0];

	if (type === stopRoute) {
		db.remove(message.channel.id);
		sendText("The current session has stopped.");
		return;
	}

	let gameInst = db.find(message.channel.id);

	for (let i = 0; i < routes.length; i++) {
		if (type === routes[i].command) {
			if (!gameInst) {
				gameInst = new routes[i].class(
					routes[i].command,
					message.channel.id,
					message.mentions.users.array()
				);
			} else {
				throw `There is currently a game in progress. Use \`^${stopRoute}\` to stop the current session before starting another one.`;
			}
		}
	}

	db.replaceOne(gameInst);

	return gameInst;
}

export function sendText(channel, text) {
	channel.send(text);
}

export async function sendInst(channel, inst) {
	let buffer = await draw(inst);
	const attachment = new Attachment(buffer, "game.png");
	channel.send(inst.text(), attachment);
}

export function restore(stringifiedInst) {
	let jsonInst = JSON.parse(stringifiedInst);
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
