import express from "express";

import userRouter from "./user";
import postRouter from "./post";
import { register, login } from "../controllers/users";
import { authMiddleware } from "../middlewares/auth";

const router: express.Router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.use(authMiddleware);

router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
