import Canvas from "../../entities/canvas";
import PlayerPiece from "../../entities/player/playerPiece";

import * as map from "../../assets/board/snakeAndLadder/layout.json";

class SnakeAndLadder {
	_id;
	type;
	canvas = new Canvas(map.img_src, map.width, map.height);
	players = [];
	playerCell = [];

	constructor(type, channel, users) {
		this._id = channel;
		this.type = type;
		let count = -1;
		if (users) {
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
						user.displayAvatarURL,
						offsetX,
						offsetY
					)
				);
				count++;
			}
		}
		this.update();
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

	text() {
		return "";
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
