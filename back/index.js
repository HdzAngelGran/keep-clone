const express = require("express");
const db = require("./db/config");

const app = express();
const PORT = 8080;
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
