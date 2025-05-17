import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getSubscriptionSummary } from "../controllers/analytics.controller.js";

const analyticsRouter = Router();

analyticsRouter.get("/summary", authorize, getSubscriptionSummary);

export default analyticsRouter;
