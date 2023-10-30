import express from "express";
import { getPosts, getPostsMe, createPost } from "../controllers/posts";

const postRouter: express.Router = express.Router();

postRouter.get("", getPosts);
postRouter.get("/me", getPostsMe);
postRouter.post("", createPost);

export default postRouter;
