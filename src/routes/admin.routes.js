import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import adminOnly from "../middlewares/admin.middleware.js";
import { getSystemStats, getAllUsersAdmin } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.use(authorize);
adminRouter.use(adminOnly);

adminRouter.get("/stats", getSystemStats);
adminRouter.get("/users", getAllUsersAdmin);

export default adminRouter;
