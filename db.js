import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const host = process.env.DB_HOST;

const uri = `mongodb+srv://${user}:${pass}@${host}`;

const client = new MongoClient(uri, {
	poolSize: 10,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

class DBDriver {
	constructor() {
		client.connect(err => {
			if (err) console.log(err);
		});
	}

	find(channel, callback) {
		let inst;
		const collection = client.db("boardbot").collection("session");
		collection.findOne({ _id: channel }, (err, result) => {
			if (err) console.log(err);
			inst = result;
			callback(inst);
		});
	}

	deleteOne(channel) {
		const collection = client.db("boardbot").collection("session");
		collection.deleteOne({ _id: channel }, (err, result) => {
			if (err) console.log(err);
		});
	}

	replaceOne(inst) {
		const collection = client.db("boardbot").collection("session");
		collection.replaceOne(
			{ _id: inst._id },
			inst,
			{
				upsert: true
			},
			(err, result) => {
				if (err) console.log(err);
			}
		);
	}
}

export default DBDriver;
