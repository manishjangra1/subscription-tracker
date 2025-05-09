import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./utils/logger.js";

import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import analyticsRouter from "./routes/analytics.routes.js";
import checkRenewals from "./jobs/reminder.job.js";
// import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

// Security middlewares
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));
// app.use(arcjetMiddleware);

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/workflows", workflowRouter);

//middlewares
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API");
});

app.listen(PORT, async () => {
  logger.info(`Subscription tracker API is running on http://localhost:${PORT}`);
  await connectToDatabase();
  
  // Start cron jobs
  checkRenewals();
});
