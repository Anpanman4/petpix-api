import { Request, Response } from "express";
import sendMailLetter from "../utils/sendMail";
import { generateRandomCode } from "../utils/utils";
import Mail from "../models/mail";

export const sendMailLet = async (req: Request, res: Response) => {
  const code = generateRandomCode();
  const answer = await sendMailLetter({ email: req.body.email, text: `Твой код: ${code}` });
  if (answer === "Сообщение успешно доставлено") {
    Mail.create({ email: req.body.email, code }).then(mail => {
      res.send(`${answer} на email ${mail.email}`);
    });
  } else {
    res.send(answer);
  }
};
