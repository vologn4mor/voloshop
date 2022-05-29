import Post from "../models/Post.js";
import PostService from "./PostService.js";

class PostController {
  async create(req, res) {
    // console.log(req.files);
    // console.log(req.body);
    try {
      console.log(req.files);
      const post = await PostService.create(req.body, req.files.picture);
      res.json(post);
    } catch (error) {
      req.status(500).json(error);
    }
  }

  async createOrder(req, res) {
    console.log(req.body);
    try {
      const post = await PostService.createOrder(req.body);
      res.json(post);
    } catch (error) {
      req.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll();
      return res.json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getOne(req, res) {
    try {
      const post = await PostService.getOne(req.params.id);
      return res.json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res) {
    try {
      const updatePost = await PostService.update(req.body);
      return res.json(updatePost);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async delete(req, res) {
    try {
      const post = await PostService.delete(req.params.id);
      return res.json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new PostController();
