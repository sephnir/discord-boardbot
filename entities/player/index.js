class Player {
	id;
	name;
	pic;

	constructor(id, username, pic) {
		this.id = id;
		this.pic = pic;
		this.name = username;
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

	get name() {
		return this._name;
	}
	/**
	 * @param {String} in_name
	 */
	set name(in_name) {
		this._name = in_name;
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
