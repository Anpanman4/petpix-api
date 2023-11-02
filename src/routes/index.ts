import express from "express";

import authRouter from "./auth";
import userRouter from "./user";
import postRouter from "./post";
import { authMiddleware } from "../middlewares/auth";

const router: express.Router = express.Router();

router.use("/auth", authRouter);

router.use(authMiddleware);

router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
