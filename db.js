import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = process.env.DB_HOST;

const uri = `mongodb+srv://${user}:${pass}@${host}/test?retryWrites=true&w=majority`;

class DBDriver {
	client;

	constructor() {
		this.client = new MongoClient(uri, { useNewUrlParser: true });
	}

	find(channel) {
		let inst;
		this.client.connect(err => {
			const collection = this.client.db("boardbot").collection("session");
			collection.findOne({ _id: channel }, (err, result) => {
				if (err) throw err;
				inst = result;
				this.client.close();
			});
		});
		return inst;
	}

	remove(channel) {
		this.client.connect(err => {
			const collection = this.client.db("boardbot").collection("session");
			collection.remove({ _id: channel });
			this.client.close();
		});
	}

	replaceOne(inst) {
		this.client.connect(err => {
			if (err) throw err;
			const collection = this.client.db("boardbot").collection("session");
			collection.replaceOne({ _id: inst._id }, inst, { upsert: true });
			this.client.close();
		});
	}
}

export default DBDriver;
