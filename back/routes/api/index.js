const express = require("express");
const router = express.Router();

router.use("/list", require("./list"));
router.use("/item", require("./item"));

module.exports = router;
