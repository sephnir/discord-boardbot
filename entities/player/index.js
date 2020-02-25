class Player {
	id;
	pic;

	constructor(id, pic) {
		this.id = id;
		this.pic = pic;
	}

	get id() {
		return this._id;
	}
	/**
	 * @param {String} in_id
	 */
	set id(in_id) {
		this._id = in_id;
	}

	get pic() {
		return this._pic;
	}
	/**
	 * @param {String} in_pic URL of user avatar image
	 */
	set pic(in_pic) {
		this._pic = in_pic;
	}
}

export default Player;
