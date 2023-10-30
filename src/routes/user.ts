import express from "express";
import { getUsers, getUserById, getMe, updateUserInfo, addToFriends, removeFromFriends } from "../controllers/users";

const userRouter: express.Router = express.Router();

userRouter.get("", getUsers);
userRouter.get("/me", getMe);
userRouter.get("/:id", getUserById);
userRouter.patch("/me", updateUserInfo);
userRouter.put("/:userId/friends", addToFriends);
userRouter.delete("/:userId/friends", removeFromFriends);

export default userRouter;
