const mongoose = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

const SubItem = mongoose.model("SubItem", SubItemSchema);

module.exports = { SubItemSchema, SubItem };
