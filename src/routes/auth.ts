import express from "express";

import { register, login } from "../controllers/users";
import { sendMailLet, checkCode, changePassword } from "../controllers/mail";

const authRouter: express.Router = express.Router();

authRouter.post("/sendcode", sendMailLet);
authRouter.post("/replycode", checkCode);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/changepassword", changePassword);

export default authRouter;
