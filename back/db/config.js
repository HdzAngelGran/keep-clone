const mongoose = require("mongoose");

const user = "user-t1";
const pw = "VT3r3u.tgHZmp7-";
const cluster = "test-cluster.vkny5aj.mongodb.net";

const uri = `mongodb+srv://${user}:${pw}@${cluster}/?retryWrites=true&w=majority&appName=todo-t1`;

mongoose.connect(uri);

const db = mongoose.connection;

module.exports = db;
