const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema(
  {
    PostId:{
      type: String,
      required: true,
    },
    Author: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      max: 500,
    },

    likes: {
      type: Array,
      default: [],
    },
    dislikes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", CommentsSchema);
