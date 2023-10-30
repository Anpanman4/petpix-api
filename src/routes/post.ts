import express from "express";
import { getPosts, getPostsMe, createPost, doLike, removeLike } from "../controllers/posts";

const postRouter: express.Router = express.Router();

postRouter.get("", getPosts);
postRouter.get("/me", getPostsMe);
postRouter.post("", createPost);
postRouter.put("/:postId/likes", doLike);
postRouter.delete("/:postId/likes", removeLike);

export default postRouter;
