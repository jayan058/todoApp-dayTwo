import express from "express";
import * as todosController from "../controller/todos";
import { auth } from "../middleware/auth";
const todoRoute = express();

todoRoute.get("/", todosController.showAllTodos);

todoRoute.post("/addTodos", todosController.addATodo);

todoRoute.put("/updateTodos/:id", todosController.updateATodo);

todoRoute.put("/completedTodo/:id", todosController.completedTodo);

todoRoute.delete("/deleteTodos/:id", todosController.deleteATodo);

export default todoRoute;
