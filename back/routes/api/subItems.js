const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {});

router.put("/:subItemId", async (req, res) => {});

router.delete("/:subItemId/delete", async (req, res) => {});

router.post("/:subItemId/comment", async (req, res) => {});

router.put("/:subItemId/comment/:commentId", async (req, res) => {});

router.put("/:subItemId/comment/:commentId/delete", async (req, res) => {});

module.exports = router;
