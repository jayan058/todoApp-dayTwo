import { findAUser } from "../models/users";
import jwt from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import { Response } from "express";

const { sign } = jwt;
const bcrypt = require("bcrypt");
import config from "../config";

let refreshTokens: string[] = [];
export async function login(email: string, password: string, res: Response) {
  const userExists = findAUser(email);

  if (!userExists) {
    res.status(404).json({ error: "No matching email" });
    return;
  }

  const match = await bcrypt.compare(password, userExists.password);

  if (!match) {
    res.status(401).json({ error: "Passwords don't match" });
    return;
  }

  const payload = {
    id: userExists.id,
    name: userExists.name,
    email: userExists.email,
  };

  const accessToken = sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  refreshTokens.push(refreshToken);

  res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
}

export function generateAccessToken(payload: object) {
  return sign(payload, config.jwt.jwt_secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
}

export function verifyRefreshToken(token: string) {
  return new Promise((resolve, reject) => {
    verify(token, config.jwt.jwt_secret!, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
}

export function isRefreshTokenValid(token: string) {
  return refreshTokens.includes(token);
}
