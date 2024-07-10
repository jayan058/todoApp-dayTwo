import * as userModels from "../models/users";
import { Response } from "express";

const bcrypt = require("bcrypt");

export async function createAUser(
  name: string,
  password: string,
  email: string,
  res: Response
) {
  if (!userModels.findAUser(email)) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
      userModels.createAUser(name, hashedPassword, email);
      res.status(201).json({ message: "User created successfully" });
      return;
    } catch (error) {
      res.status(500).json({ error: "Error creating the user" });
      return;
    }
  } else {
    res.status(404).json({ error: "Email already exists" });
    return;
  }
}

export async function findUserById(id: string, res: Response) {
  let foundUser: any;
  foundUser = userModels.findUserById(id);
  if (foundUser) {
    res.status(200).json({ message: "Found the user", foundUser });
  } else {
    res.status(404).json({ error: "No user with that ID" });
    return;
  }
}
