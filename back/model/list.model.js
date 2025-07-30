const mongoose = require("mongoose");
const { ItemSchema } = require("./item.model");

const ListSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "User is required"],
    },
    items: {
      type: [ItemSchema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", ListSchema);

module.exports = List;
