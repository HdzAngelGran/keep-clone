const express = require("express");
const router = express.Router();
const List = require("../../model/list.model");

router.get("/:user", async (req, res) => {
  const user = req.params.user;
  try {
    const list = await List.findOne({ user });
    res.status(200).json(list);
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/:user", async (req, res) => {
  const user = req.params.user;
  try {
    const list = await List.create({ user });
    res.status(200).json(list);
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
