import express from "express";

import { register, login } from "../controllers/users";
import { sendMailLet, checkCode, changePassword } from "../controllers/mail";
import uploadMiddleware from "../middlewares/uploadImage";

const authRouter: express.Router = express.Router();

authRouter.post("/sendcode", sendMailLet);
authRouter.post("/replycode", checkCode);
authRouter.post("/register", uploadMiddleware.single("avatar"), register);
authRouter.post("/login", login);
authRouter.post("/changepassword", changePassword);

export default authRouter;
