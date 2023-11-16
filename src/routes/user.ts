import express from "express";
import {
  getUsers,
  getUserById,
  getMe,
  updateUserInfo,
  updateUserAvatar,
  addToFriends,
  removeFromFriends,
} from "../controllers/users";
import uploadMiddleware from "../middlewares/uploadImage";

const userRouter: express.Router = express.Router();

userRouter.get("", getUsers);
userRouter.get("/me", getMe);
userRouter.get("/:id", getUserById);
userRouter.patch("/me", updateUserInfo);
userRouter.patch("/me/avatar", uploadMiddleware.single("avatar"), updateUserAvatar);
userRouter.put("/:userId/friends", addToFriends);
userRouter.delete("/:userId/friends", removeFromFriends);

export default userRouter;
