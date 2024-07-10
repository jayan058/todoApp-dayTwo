import { Request, Response } from "express";
import * as userServices from "../services/user";

export async function createAUser(req: Request, res: Response) {
  const { name, password, email } = req.body;
  const message = await userServices.createAUser(name, password, email, res);
  res.json(message);
}

export async function fetchUserById(req: Request, res: Response) {
  const id = req.params.id;
  const message = await userServices.findUserById(id, res);
  res.json(message);
}
