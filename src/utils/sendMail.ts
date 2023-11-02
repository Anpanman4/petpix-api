import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

import { IMailLetter } from "../types/mailLetter";

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMailLetter = async ({ email, text }: IMailLetter) => {
  const info = {
    from: process.env.EMAIL,
    to: `${email}`,
    subject: "Petpix",
    text: `Текст`,
    html: `<b>${text}</b>`,
  };
  const result = await transporter.sendMail(info);
  if (result.response.slice(0, 3) === "250") {
    return "Сообщение успешно доставлено";
  }
  return `Произошла ошибка ${result.response}`;
};

export default sendMailLetter;
