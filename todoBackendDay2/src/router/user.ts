import express from "express";
import * as userController from "../controller/user";
import * as userMiddleware from "../middleware/auth";

const userRoute = express();

userRoute.post("/", userController.createAUser);

userRoute.get("/:id", userMiddleware.auth, userController.fetchUserById);

export default userRoute;
