const mongoose = require("mongoose");

const GameHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  game: { type: String, required: true },
  result: { type: String, enum: ["win", "loss"], required: true },
  betAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GameHistory", GameHistorySchema);
