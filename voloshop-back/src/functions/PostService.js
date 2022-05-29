import Post from "../models/Post.js";
import FileService from "./FileService.js";
import { Consts } from "../consts.js";
import Order from "../models/Order.js";

class PostController {
  async create(post, picture) {
    const fileName = FileService.saveFile(picture);
    const createdPost = await Post.create({
      ...post,
      picture: fileName,
    });
    return createdPost;
  }

  async createOrder(order) {
    const createdPost = await Order.create(order);
    return createdPost;
  }

  async getAll() {
    const posts = await Post.find();
    return posts;
  }
  async getOne(id) {
    if (!id) {
      throw new Error("не указан ид");
    }
    const post = await Post.findById(id);
    return post;
  }
  async update(post) {
    if (!post._id) {
      throw new Error("Не указан ид");
    }

    const updatePost = await Post.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatePost;
  }
  async delete(id) {
    if (!id) {
      throw new Error("Не указан ид");
    }
    const post = await Post.findByIdAndDelete(id);
    return post;
  }
}

export default new PostController();
