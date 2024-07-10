import * as todosModels from "./../models/todos";
import { ITodo } from "./../interface/todo";
import { Response } from "express";

export function showAllTodos() {
  return todosModels.showAllTodos();
}

export function addATodo(todo: ITodo) {
  todosModels.createATodo(todo);
}

export function updateATodo(
  id: string,
  name: string,
  isDone: boolean,
  res: Response
) {
  const todo = todosModels.todos.find((todo) => todo.id === id);

  if (todo) {
    todo.name = name;
    todo.isDone = isDone;
    res
      .status(200)
      .json({ message: `Successfully updated Todo with id ${id}` });
  } else {
    res.status(404).json({ error: "Oops, Todo with that ID doesn't exist" });
  }
}

export function deleteATodo(id: string, res: Response) {
  const todo = todosModels.todos.find((todo) => todo.id === id);

  if (todo) {
    const updatedTodos = todosModels.todos.filter((todo) => todo.id !== id);
    todosModels.todos.length = 0; // Clear the original array
    todosModels.todos.push(...updatedTodos);
    res
      .status(200)
      .json({ message: `Successfully deleted Todo with id ${id}` });
  } else {
    res.status(404).json({ error: "Oops, Todo with that ID doesn't exist" });
  }
}

export function completedATodo(id: string, res: Response) {
  const todo = todosModels.todos.find((todo) => todo.id === id);

  if (todo) {
    todo.isDone = true;
    res
      .status(200)
      .json({ message: `Successfully updated Todo status with id ${id}` });
  } else {
    res.status(404).json({ error: "Oops, Todo with that ID doesn't exist" });
  }
}
