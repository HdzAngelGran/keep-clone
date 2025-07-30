const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { CommentSchema, Comment };
