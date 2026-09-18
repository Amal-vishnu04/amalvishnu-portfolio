const { validationResult } = require("express-validator");
const { sendNotificationEmail, sendAutoReplyEmail } = require("../utils/mailer");

// Verify Google reCAPTCHA v3 token
async function verifyRecaptcha(token) {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    { method: "POST" }
  );
  const data = await response.json();
  return data.success && data.score >= 0.5;
}

// Basic sanitize: strip HTML tags
function sanitize(text) {
  return String(text).replace(/<\/?[^>]+(>|$)/g, "").trim();
}

exports.submitContactForm = async (req, res) => {
  try {
    // 1. Validation errors check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message, recaptchaToken } = req.body;

    // 2. reCAPTCHA verification
    if (process.env.RECAPTCHA_SECRET) {
      const isHuman = await verifyRecaptcha(recaptchaToken);
      if (!isHuman) {
        return res.status(403).json({
          success: false,
          error: "Spam check failed. Please try again.",
        });
      }
    }

    // 3. Sanitize inputs
    const clean = {
      name: sanitize(name),
      email: sanitize(email),
      subject: sanitize(subject),
      message: sanitize(message),
    };

    // 4. Send emails asynchronously in background (Fast Response)
    sendNotificationEmail(clean).catch((err) =>
      console.error("Notification Email Error:", err)
    );
    sendAutoReplyEmail(clean).catch((err) =>
      console.error("AutoReply Email Error (Resend free restriction):", err)
    );

    // 5. Send fast success response to Frontend UI
    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again later.",
    });
  }
};