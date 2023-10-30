import express from "express";
import { createPost, getPosts } from "../controllers/posts";

const postRouter: express.Router = express.Router();

postRouter.get("", getPosts);
postRouter.post("", createPost);

export default postRouter;
