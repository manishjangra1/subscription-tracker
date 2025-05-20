import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import Session from "../models/session.model.js";

export const generateTokens = async (userId, userAgent, ip) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await Session.create({
    user: userId,
    refreshToken,
    expiresAt,
    userAgent,
    ip,
  });

  return { accessToken, refreshToken };
};

export const clearSessions = async (userId) => {
  await Session.deleteMany({ user: userId });
};
