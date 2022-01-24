const { MongoClient } = require("mongodb");
const colors = require("colors");
require("dotenv").config();
// Connection URI
const uri = process.env.MONGODB_CLIENT;
// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db("firstlight");
    const collection = db.collection("news");
    var date = new Date();
    date.setMonth(date.getMonth() - 1);
    await collection.deleteMany({ date: { $lte: date } });
    // console.log(await collection.find({}).toArray());
    console.log(colors.green("Old news successfully deleted"));
  } catch (e) {
    console.log(colors.red("News could not be deleted, please try again"));
  }
}

main().then(() => {
  process.exit(1);
});
