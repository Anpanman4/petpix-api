import { Request, Response, NextFunction } from "express";

import Post from "../models/post";

import { RequestWithUser } from "../types/reqWithUser";

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
  Post.find({})
    .populate(["owner", "likes"])
    .then(cards => {
      res.send(cards);
    })
    .catch(next);
};

export const createPost = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { description, img } = req.body;
  const id = req.user._id;

  Post.create({ img, description, owner: id })
    .then(post => post.populate(["owner"]))
    .then(postWithOwner => {
      res.status(201).send(postWithOwner);
    })
    .catch(err => {
      if (err.name === "ValidationError") next(new SyntaxError("Переданы некорректные данные при создании карточки."));
      next(err);
    });
};
