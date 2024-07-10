import { log } from "console";

type users = {
  id: string;
  name: string;
  password: string;
  email: string;
  todos: string[];
};

let users: users[] = [];

export function createAUser(name: string, password: string, email: string) {
  const id = (users.length + 1).toString();
  const newUser: users = { id, name, password, email, todos: [] };
  users.push(newUser);
  
}

export function findAUser(email: string) {
  return users.find((user) => user.email === email);
}

export function findUserById(id: string) {
  return users.find((user) => user.id == id);
}
