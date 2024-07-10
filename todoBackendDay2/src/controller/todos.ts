import { Request, Response } from "express";
import * as todoServices from "./../services/todos";
export function showAllTodos(req: Request, res: Response) {
  let data = todoServices.showAllTodos();
  res.json(data);
}
export function addATodo(req: Request, res: Response) {
  const { body } = req;
  todoServices.addATodo(body);
  res.json("Successfully created A Todo");
}

export function updateATodo(req: Request, res: Response) {
  const id = req.params.id;
  const { name, isDone } = req.body;

  const message = todoServices.updateATodo(id, name, isDone, res);
  res.json(message);
}

export function deleteATodo(req: Request, res: Response) {
  const id = req.params.id;
  let message = todoServices.deleteATodo(id, res);
  res.json(message);
}

export function completedTodo(req: Request, res: Response) {
  const id = req.params.id;
  let message = todoServices.completedATodo(id, res);
  res.json(message);
}
