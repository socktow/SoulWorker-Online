const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const forumSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["discussion", "game-tips", "qa", "art-media"], 
    required: true 
  },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  bookmarks: [{ type: Schema.Types.ObjectId, ref: "User" }],
  commentCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = models.Forum || model("Forum", forumSchema);
