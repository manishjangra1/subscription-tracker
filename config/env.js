import { config } from "dotenv";
import { cleanEnv, str, num, url } from "envalid";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const env = cleanEnv(process.env, {
  PORT: num({ default: 5500 }),
  NODE_ENV: str({ choices: ["development", "test", "production"], default: "development" }),
  DB_URI: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: "1d" }),
  ARCJET_KEY: str(),
  ARCJET_ENV: str({ choices: ["development", "test", "production"], default: "development" }),
  QSTASH_URL: url(),
  QSTASH_TOKEN: str(),
  QSTASH_CURRENT_SIGNING_KEY: str(),
  QSTASH_NEXT_SIGNING_KEY: str(),
  SERVER_URL: url(),
  EMAIL_PASSWORD: str(),
});

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ARCJET_KEY,
  ARCJET_ENV,
  QSTASH_URL,
  QSTASH_TOKEN,
  QSTASH_CURRENT_SIGNING_KEY,
  QSTASH_NEXT_SIGNING_KEY,
  SERVER_URL,
  EMAIL_PASSWORD,
} = env;
