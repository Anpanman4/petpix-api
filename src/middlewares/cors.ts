import { Request, Response, NextFunction } from "express";

const allowedCors = ["http://localhost:3000", "localhost:3000"];

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

export const corsMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers["access-control-request-headers"];

  if (origin && allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }

  return next();
};
