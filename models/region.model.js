const mongoose = require("mongoose");

const Regions = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
    trim: true,
  },
  nurses: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
  ],
  createdAt: {
    type: String,
    default: Date.now(),
  },
});


module.exports = mongoose.model("Regions", Regions);
