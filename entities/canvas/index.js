class Canvas {
	path;
	width;
	height;

	constructor(path, width, height) {
		this.path = path;
		this.width = width;
		this.height = height;
	}

	get path() {
		return this._path;
	}
	/**
	 * @param {String} in_path
	 */
	set path(in_path) {
		this._path = in_path;
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

	restore() {}
}

export default Canvas;
