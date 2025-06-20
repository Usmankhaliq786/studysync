const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Goal", goalSchema);
