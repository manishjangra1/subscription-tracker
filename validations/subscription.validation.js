import Joi from "joi";

export const createSubscriptionSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  price: Joi.number().min(0).required(),
  currency: Joi.string().valid("USD", "INR", "EUR").default("INR"),
  frequency: Joi.string().valid("daily", "weekly", "monthly", "yearly").required(),
  category: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  description: Joi.string().max(500),
  reminderDays: Joi.number().min(1).default(7),
});
