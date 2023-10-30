import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import User from "../models/user";

import { userBody } from "../types/userBody";

import SyntaxError from "../errors/syntaxError";
import AlreadyCreatedError from "../errors/alreadyCreatedError";
import AuthError from "../errors/authError";

import { JWT_SECRET_KEY } from "../utils/utils";
import { RequestWithUser } from "../types/reqWithUser";
import NotFoundError from "../errors/notFoundError";

dotenv.config();

export const register = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, username, firstName } = req.body;

  hash(password, 10)
    .then(hashedPassword => {
      return { email, password: hashedPassword, username, firstName };
    })
    .then((body: userBody) => {
      User.create(body)
        .then(user => {
          if (user) {
            res.status(201).send({ email, username, firstName });
          }
        })
        .catch(err => {
          if (err.code === 11000) {
            return next(new AlreadyCreatedError("Пользователь с таким Email уже зарегистрирован"));
          }
          if (err.name === "ValidationError") {
            return next(new SyntaxError("Переданы некорректные данные при создании пользователя."));
          }
          return next(err);
        });
    })
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then(user => {
      if (!user) {
        return next(new AuthError("Пользователь не найден"));
      }
      compare(password, user.password)
        .then((isMatched: boolean) => {
          if (!isMatched) {
            next(new AuthError("Введен неправильный пароль"));
          }

          const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET_KEY, {
            expiresIn: "2d",
          });

          res.send({ token: jwt });
        })
        .catch(next);
    })
    .catch(next);
};

export const getUsers = (req: RequestWithUser, res: Response) => {
  User.find({})
    .populate(["friends"])
    .then(users => res.send(users));
};

export const getUserById = async (req: RequestWithUser, res: Response) => {
  const { id } = req.params;
  return res.send(await User.findById(id));
};

export const getMe = async (req: RequestWithUser, res: Response) => {
  const id = req.user._id;
  return res.send(await User.findById(id));
};

export const updateUserInfo = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const id = req.user._id;
  const { email, firstName, about } = req.body;
  User.findByIdAndUpdate(
    id,
    {
      email,
      firstName,
      about,
    },
    {
      new: true,
    }
  )
    .then(user => {
      if (user) res.send(user);
    })
    .catch(err => {
      if (err.name === "ValidationError")
        return next(new SyntaxError("Переданы некорректные данные для обновления информации."));
      return next(err);
    });
};

export const addToFriends = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { $addToSet: { friends: userId } }, { new: true })
    .populate(["friends"])
    .then(user => {
      if (user) res.send(user);
      return next(new NotFoundError("Пользователь по ID не найден"));
    })
    .catch(err => {
      if (err.name === "CastError") next(new SyntaxError("Передан невалидный ID"));
      next(err);
    });
};

export const removeFromFriends = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const id = req.user._id;

  User.findByIdAndUpdate(id, { $pull: { friends: userId } }, { new: true })
    .populate(["friends"])
    .then(user => {
      if (user) res.send(user);
      return next(new NotFoundError("Пользователь по ID не найден"));
    })
    .catch(err => {
      if (err.name === "CastError") next(new SyntaxError("Передан невалидный ID"));
      next(err);
    });
};
