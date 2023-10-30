import { Request, Response, NextFunction } from "express";

import Post from "../models/post";

import { RequestWithUser } from "../types/reqWithUser";
import NotFoundError from "../errors/notFoundError";

export const getPosts = (req: Request, res: Response, next: NextFunction) => {
  Post.find({})
    .populate(["owner", "likes"])
    .then(cards => {
      res.send(cards);
    })
    .catch(next);
};

export const getPostsMe = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const user = req.user;
  Post.find({ owner: user })
    .populate(["owner", "likes"])
    .then(cards => {
      res.send(cards);
    })
    .catch(next);
};

export const createPost = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { description, img } = req.body;
  const id = req.user._id;
  console.log(req.files, req.file);
  if (req.file) {
    const { destination, filename } = req.file;

    Post.create({ img: `${destination}${filename}`, description, owner: id })
      .then(post => post.populate(["owner"]))
      .then(postWithOwner => {
        res.status(201).send(postWithOwner);
      })
      .catch(err => {
        if (err.name === "ValidationError")
          next(new SyntaxError("Переданы некорректные данные при создании карточки."));
        next(err);
      });
  } else {
    next("Файл не передался");
  }
};

export const doLike = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { postId } = req.params;

  Post.findByIdAndUpdate(postId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(["owner", "likes"])
    .then(post => {
      if (post) return res.send(post);
      return next(new NotFoundError("Карточка по ID не найдена"));
    })
    .catch(err => {
      if (err.name === "CastError") next(new SyntaxError("Передан невалидный ID"));
      next(err);
    });
};

export const removeLike = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { postId } = req.params;

  Post.findByIdAndUpdate(postId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(["owner", "likes"])
    .then(post => {
      if (post) return res.send(post);
      return next(new NotFoundError("Карточка по ID не найдена"));
    })
    .catch(err => {
      if (err.name === "CastError") next(new SyntaxError("Передан невалидный ID"));
      next(err);
    });
};
