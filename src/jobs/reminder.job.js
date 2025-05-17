import cron from "node-cron";
import Subscription from "../models/subscription.model.js";
import { sendVerificationEmail } from "../services/email.service.js"; // Reusing email logic
import logger from "../utils/logger.js";

const checkRenewals = async () => {
  logger.info("Running daily renewal check...");
  const today = new Date();
  
  try {
    const subscriptions = await Subscription.find({
      status: "active",
      renewalDate: {
        $lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000), // Next 7 days
      },
    }).populate("user");

    for (const sub of subscriptions) {
      // Send reminder email logic here
      logger.info(`Sending reminder for ${sub.name} to ${sub.user.email}`);
      // await sendReminderEmail(sub.user.email, sub.name, sub.renewalDate);
    }
  } catch (error) {
    logger.error("Error in renewal job:", error);
  }
};

// Run every day at midnight
cron.schedule("0 0 * * *", checkRenewals);

export default checkRenewals;
