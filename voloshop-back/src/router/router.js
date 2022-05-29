import { Router } from "express";
import PostController from "../functions/PostController.js";

const router = new Router();

router.post("/posts", PostController.create);
router.post("/order", PostController.createOrder);
router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getOne);
router.put("/posts", PostController.update);
router.delete("/posts/:id", PostController.delete);

export default router;
