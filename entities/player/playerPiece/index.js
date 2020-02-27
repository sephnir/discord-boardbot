import Player from "..";

class PlayerPiece extends Player {
	width;
	height;
	posX;
	posY;
	offsetX;
	offsetY;
	cell;

	constructor(id, username, pic, offsetX, offsetY) {
		super(id, username, pic);
		this.width = 32;
		this.height = 32;
		this.posX = 0;
		this.posY = 0;
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.cell = 0;
	}

	get width() {
		return this._width;
	}
	/**
	 * @param {Number} in_width
	 */
	set width(in_width) {
		this._width = in_width;
	}

	get height() {
		return this._height;
	}
	/**
	 * @param {Number} in_height
	 */
	set height(in_height) {
		this._height = in_height;
	}

	get posX() {
		return this._posX;
	}
	/**
	 * @param {Number} in_posX
	 */
	set posX(in_posX) {
		this._posX = in_posX;
	}

	get posY() {
		return this._posY;
	}
	/**
	 * @param {Number} in_posY
	 */
	set posY(in_posY) {
		this._posY = in_posY;
	}

	get offsetX() {
		return this._offsetX;
	}
	/**
	 * @param {Number} in_offsetX
	 */
	set offsetX(in_offsetX) {
		this._offsetX = in_offsetX;
	}

	get offsetY() {
		return this._offsetY;
	}
	/**
	 * @param {Number} in_offsetY
	 */
	set offsetY(in_offsetY) {
		this._offsetY = in_offsetY;
	}

	get cell() {
		return this._cell;
	}
	/**
	 * @param {Number} in_cell
	 */
	set cell(in_cell) {
		this._cell = in_cell;
	}

	draw() {
		return {
			img: this.pic,
			w: this.width,
			h: this.height,
			x: this.posX + this.offsetX,
			y: this.posY + this.offsetY,
			rot: 0,
			sx: 1,
			sy: 1
		};
	}

	restore() {}
}

export default PlayerPiece;
