require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const db = require("./db/config");

const app = express();
const PORT = 8080;

const config = {
  origin: "*",
  methods: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
  origin: true,
};

app.use(cors(config));

app.use(cors());

app.use(express.json());

app.use(require("./routes"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
