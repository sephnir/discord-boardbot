import Canvas from "../../entities/canvas";
import PlayerPiece from "../../entities/player/playerPiece";

import * as map from "../../assets/board/snakeAndLadder/layout.json";

class SnakeAndLadder {
	_id;
	type;
	canvas = new Canvas(map.img_src, map.width, map.height);
	players;
	turn = 0;

	constructor(type, channel, users) {
		this.players = [];
		this._id = channel;
		this.type = type;

		this.init(users);
	}

	get type() {
		return this._type;
	}
	/**
	 * @param {String} in_type
	 */
	set type(in_type) {
		this._type = in_type;
	}

	get canvas() {
		return this._canvas;
	}
	/**
	 * @param {Canvas} in_canvas
	 */
	set canvas(in_canvas) {
		this._canvas = in_canvas;
	}

	get players() {
		return this._players;
	}
	/**
	 * @param {PlayerPiece[]} in_players
	 */
	set players(in_players) {
		this._players = in_players;
	}

	get playerCell() {
		return this._players;
	}
	/**
	 * @param {Number[]} in_playersCell
	 */
	set playerCell(in_playersCell) {
		this._playersCell = in_playersCell;
	}

	init(users) {
		if (users) {
			let count = -1;
			if (users.length > 4 || users.length < 1) {
				return "Number of players must be between `1` to `4`.";
			}

			for (let user of users) {
				let offsetX =
					(Math.cos((count * Math.PI) / 2 - Math.PI / 4) *
						map.cell_width) /
						3 -
					32 / 2;
				let offsetY =
					(Math.sin((count * Math.PI) / 2 - Math.PI / 4) *
						map.cell_height) /
						4 -
					32 / 2;

				this.players.push(
					new PlayerPiece(
						user.id,
						user.username,
						user.displayAvatarURL,
						offsetX,
						offsetY
					)
				);
				count++;
			}

			this.update();

			let message = `A new game has started!`;
			for (let player of this.players) {
				message += ` <@${player.id}>`;
			}
			let temp = this.players[0].id;
			message += `\nIt is currently <@${temp}> turn. Use \`roll\` to start.`;
			return message;
		}
	}

	route(commands, user) {
		switch (commands[0]) {
			case "roll":
				return this.roll(user);
			default:
				return;
		}
	}

	roll(user) {
		if (user.id != this.players[this.turn].id) {
			return `It is currently <@${this.players[this.turn].id}> turn`;
		}

		let dice = 1 + Math.floor(Math.random() * 6);
		let msg = `<@${
			this.players[this.turn].id
		}> has rolled a \`${dice}\`!\n`;

		this.players[this.turn].cell += dice;
		msg += this.checkJump();
		this.turn = (this.turn + 1) % this.players.length;

		this.update();
		return msg;
	}

	checkJump() {
		let msg = "";
		for (let jump of map.jumps) {
			if (this.players[this.turn].cell == jump.from) {
				if (jump.label) {
					msg += jump.label;
				} else {
					msg += `<@${
						this.players[this.turn].id
					}> jumped from \`${this.players[this.turn].cell +
						1}\` to \`${jump.to + 1}\` `;
				}
				this.players[this.turn].cell = jump.to;
			}
		}
		return msg;
	}

	update() {
		for (let player of this.players) {
			let cell = player.cell;

			player.posX = map.cells[cell].x;
			player.posY = map.cells[cell].y;
		}
	}

	draw() {
		let drawables = [];
		this.players.forEach(player => {
			drawables.push(player.draw());
		});
		return drawables;
	}

	restore() {
		this.canvas = Object.assign(new Canvas(), this.canvas);
		this.canvas.restore();

		for (let i = 0; i < this.players.length; i++) {
			this.players[i] = Object.assign(new PlayerPiece(), this.players[i]);
			this.players[i].restore();
		}
	}
}

export default SnakeAndLadder;
