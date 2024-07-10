import { Request, Response, NextFunction } from "express";
import { verify, TokenExpiredError } from "jsonwebtoken";
import config from "../config";

export function auth(req: Request, res: Response, next: NextFunction) {
  const { headers } = req;
  if (!headers.authorization) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  const token = headers.authorization.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  try {
    verify(token[1], config.jwt.jwt_secret!);
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(403).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Unauthenticated" });
  }
}
