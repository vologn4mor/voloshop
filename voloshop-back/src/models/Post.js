import mongoose from "mongoose";

const Post = new mongoose.Schema({
  // author: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  cost: { type: Number, required: true },
  picture: { type: String, required: true },
});

export default mongoose.model("Post", Post);
