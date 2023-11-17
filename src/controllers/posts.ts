import { Request, Response, NextFunction } from "express";

import Post from "../models/post";
import User from "../models/user";

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

export const getFavoriteFriendsPhoto = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const id = req.user._id;
  const posts: any = [];

  const user = await User.findById(id);
  if (user?.friends) {
    for (const friend of user?.friends) {
      const post = await Post.find({ owner: friend }).populate(["owner"]);
      posts.push(...post);
    }
    posts.sort((a: any, b: any) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });
    res.send(posts);
  }
};

export const getPostsById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  Post.find({ owner: id }).then(posts => res.send(posts));
};

export const createPost = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { description } = req.body;
  const id = req.user._id;
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
    next(new Error("Файл не передан"));
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
