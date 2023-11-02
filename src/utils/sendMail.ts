import nodemailer from "nodemailer";

import { IMailLetter } from "../types/mailLetter";

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: "its.pochta95@mail.ru",
    pass: "CA8XYwUnxJYtd1g85scQ",
  },
});

const sendMailLetter = async ({ email, text }: IMailLetter) => {
  const info = {
    from: "its.pochta95@mail.ru",
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
