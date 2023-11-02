import express from "express";
import uploadMiddleware from "../middlewares/uploadImage";
import { getPosts, getPostsMe, getFavoriteFriendsPhoto, createPost, doLike, removeLike } from "../controllers/posts";

const postRouter: express.Router = express.Router();

postRouter.get("", getPosts);
postRouter.get("/me", getPostsMe);
postRouter.get("/favorite", getFavoriteFriendsPhoto);
postRouter.post("", uploadMiddleware.single("img"), createPost);
postRouter.put("/:postId/likes", doLike);
postRouter.delete("/:postId/likes", removeLike);

export default postRouter;
