const mongoose = require("mongoose");
const { CommentSchema } = require("./comment.model");

const SubItemSchema = mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
      required: false,
    },
    comments: {
      type: [CommentSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const SubItem = mongoose.model("SubItem", SubItemSchema);

module.exports = { SubItemSchema, SubItem };
