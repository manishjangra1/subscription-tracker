import transporter, { accountEmail } from "../config/nodemailer.js";
import logger from "../shared/utils/logger.js";

export const sendEmail = async ({ to, subject, html, retries = 3 }) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const info = await transporter.sendMail({
        from: accountEmail,
        to,
        subject,
        html,
      });
      logger.info(`Email sent: ${info.messageId}`);
      return info;
    } catch (error) {
      attempt++;
      logger.error(`Failed to send email (attempt ${attempt}): ${error.message}`);
      if (attempt >= retries) throw error;
      // Wait before retrying (exponential backoff simulated)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
};
