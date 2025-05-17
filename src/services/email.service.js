import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.APP_URL}/api/v1/auth/verify?token=${token}`;

  const mailOptions = {
    from: accountEmail,
    to: email,
    subject: "Verify your email - SubTrack Pro",
    html: `<h1>Welcome!</h1><p>Please verify your email by clicking <a href="${verificationUrl}">here</a>.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send verification email");
  }
};
