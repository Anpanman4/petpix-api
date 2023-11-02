import { Request, Response } from "express";
import { hash } from "bcrypt";

import Mail from "../models/mail";
import User from "../models/user";

import sendMailLetter from "../utils/sendMail";
import { generateRandomCode } from "../utils/utils";

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

export const checkCode = (req: Request, res: Response) => {
  const { email, code } = req.body;

  Mail.findOne({ email }).then(data => {
    if (data?.code === code) {
      Mail.findOneAndDelete({ email }).then(response => {
        if (response) res.send({ answer: "Код совпал", isTrue: true });
      });
    } else {
      if (!data) return res.send({ answer: "Данный email не зафиксирован", isTrue: false });
      return res.send({ answer: "Неверный код", isTrue: false });
    }
  });
};

export const changePassword = (req: Request, res: Response) => {
  const { email, password: newPassword } = req.body;
  hash(newPassword, 10).then(hashedPassword => {
    User.findOneAndUpdate({ email }, { password: hashedPassword }).then(userWithNewPassword => {
      res.send(userWithNewPassword);
    });
  });
};
