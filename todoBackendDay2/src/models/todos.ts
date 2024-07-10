import { ITodo } from "./../interface/todo";

export type todos = {
  id: string;
  name: string;
  isDone: boolean;
};

export let todos: todos[] = [];

export function showAllTodos() {
  return todos;
}

export function createATodo(todo: ITodo) {
  todos.push({ id: `${todos.length + 1}`, ...todo });
}
