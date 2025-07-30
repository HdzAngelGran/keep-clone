const express = require("express");
const List = require("../../model/list.model");
const router = express.Router();
const user = 1;

router.post("/", async (req, res) => {
  try {
    const list = await List.findOneAndUpdate(
      { user },
      { $push: { items: {} } },
      { new: true, upsert: true }
    );
    const newItem = list.items[list.items.length - 1];
    res.status(200).json({ newItemId: newItem._id });
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:itemId/status", async (req, res) => {
  const itemId = req.params.itemId;
  const status = req.body.status;
  try {
    const list = await List.findOneAndUpdate(
      { user, "items._id": itemId },
      {
        $set: {
          "items.$.completed": status,
        },
      },
      { upsert: true }
    );
    res.status(200).json("Item updated successfully");
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:itemId/text", async (req, res) => {
  const itemId = req.params.itemId;
  const text = req.body.text;
  try {
    const item = await List.findOneAndUpdate(
      { user, "items._id": itemId },
      {
        $set: {
          "items.$.text": text,
        },
      },
      { upsert: true }
    );
    res.status(200).json("Item updated successfully");
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const item = await List.findOneAndUpdate(
      { user },
      {
        $pull: {
          items: { _id: itemId },
        },
      },
      { upsert: true }
    );

    if (!item) return res.status(404).json("Item not found");

    res.status(200).json("item deleted successfully");
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/:itemId/comment", async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const list = await List.findOneAndUpdate(
      { user, "items._id": itemId },
      { $push: { "items.$.comments": {} } },
      { new: true, upsert: true }
    );
    const item = list.items.find((i) => i._id.toString() === itemId);
    const newComment = item.comments[item.comments.length - 1];
    res.status(200).json({ newCommentId: newComment._id });
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:itemId/comment/:commentId", async (req, res) => {
  const { itemId, commentId } = req.params;
  const text = req.body.text;
  try {
    const list = await List.findOne({ user, "items._id": itemId }).then(
      (list) => {
        if (!list) {
          return res.status(404).json("Item not found");
        }

        list.items = list.items.map((item) => {
          if (item._id.toString() === itemId) {
            item.comments = item.comments.map((comment) => {
              if (comment._id.toString() === commentId) {
                comment.text = text;
              }
              return comment;
            });
          }
          return item;
        });
        list.save();
      }
    );
    res.status(200).json("Comment updated successfully");
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:itemId/comment/:commentId", async (req, res) => {
  const { itemId, commentId } = req.params;
  try {
    const list = await List.findOne({ user, "items._id": itemId }).then(
      (list) => {
        if (!list) {
          return res.status(404).json("Item not found");
        }

        list.items = list.items.map((item) => {
          if (item._id.toString() === itemId) {
            item.comments = item.comments.filter(
              (comment) => comment._id.toString() !== commentId
            );
          }
          return item;
        });
        list.save();
      }
    );
    res.status(200).json("Comment updated successfully");
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/:itemId/sub-item", async (req, res) => {
  const itemId = req.params.itemId;
  try {
    const list = await List.findOneAndUpdate(
      { user, "items._id": itemId },
      { $push: { "items.$.subItems": {} } },
      { new: true, upsert: true }
    );
    const item = list.items.find((i) => i._id.toString() === itemId);
    const newSubItem = item.subItems[item.subItems.length - 1];
    res.status(200).json({ newSubItemId: newSubItem._id });
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:itemId/subItem/:subItemId/text", async (req, res) => {
  const { itemId, subItemId } = req.params;
  const text = req.body.text;
  try {
    const list = await List.findOne({ user, "items._id": itemId }).then(
      (list) => {
        if (!list) {
          return res.status(404).json("Item not found");
        }

        list.items = list.items.map((item) => {
          if (item._id.toString() === itemId) {
            item.subItems = item.subItems.map((subItem) => {
              if (subItem._id.toString() === subItemId) {
                subItem.text = text;
              }
              return subItem;
            });
          }
          return item;
        });
        list.save();
      }
    );
    res.status(200).json("Comment updated successfully");
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/:itemId/subItem/:subItemId/status", async (req, res) => {
  const { itemId, subItemId } = req.params;
  const status = req.body.status;
  try {
    const list = await List.findOne({ user, "items._id": itemId }).then(
      (list) => {
        if (!list) {
          return res.status(404).json("Item not found");
        }

        list.items = list.items.map((item) => {
          if (item._id.toString() === itemId) {
            item.subItems = item.subItems.map((subItem) => {
              if (subItem._id.toString() === subItemId) {
                subItem.completed = status;
              }
              return subItem;
            });
          }
          return item;
        });
        list.save();
      }
    );
    res.status(200).json("Comment updated successfully");
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:itemId/subItem/:subItemId", async (req, res) => {
  const { itemId, subItemId } = req.params;
  try {
    const list = await List.findOne({ user, "items._id": itemId }).then(
      (list) => {
        if (!list) {
          return res.status(404).json("Item not found");
        }
        list.items = list.items.map((item) => {
          if (item._id.toString() === itemId) {
            item.subItems = item.subItems.filter(
              (subItem) => subItem._id.toString() !== subItemId
            );
          }
          return item;
        });
        list.save();
      }
    );
    res.status(200).json("Comment updated successfully");
  } catch (error) {
    console.error("Error finding list:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
