import { Router } from "express";
import { getUser, getUsers, updateProfileImage } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.patch("/profile-image", authorize, upload.single("image"), updateProfileImage);

userRouter.post("/", (req, res) => res.send({ title: "CREATE new users" }));
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE users" }));
userRouter.delete("/:id", (req, res) => res.send({ title: "DELETE users" }));

export default userRouter;
