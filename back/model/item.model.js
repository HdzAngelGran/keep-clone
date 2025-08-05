const mongoose = require("mongoose");
const { SubItemSchema } = require("./subItem.model");

const ItemSchema = mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    subItems: {
      type: [SubItemSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = { ItemSchema, Item };
