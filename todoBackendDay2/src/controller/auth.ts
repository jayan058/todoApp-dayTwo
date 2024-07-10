import { Request, Response } from "express";
import * as authServices from "../services/auth";
import { log } from "console";
import { User } from "../interface/user";
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const message = await authServices.login(email, password, res);

  res.json(message);
}

export async function handleTokenRefresh(req: Request, res: Response) {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  if (!authServices.isRefreshTokenValid(token)) return res.sendStatus(403);
  try {
    const user = (await authServices.verifyRefreshToken(token)) as User;
    const accessToken = authServices.generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(403);
  }
}
