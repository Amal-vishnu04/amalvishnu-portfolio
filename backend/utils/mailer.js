const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// 1. Notification Email sent to YOU (Amal)
async function sendNotificationEmail({ name, email, subject, message }) {
  const dateTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  return resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.RECEIVER_EMAIL || "amalvishnu21702@gmail.com",
    replyTo: email,
    subject: `📩 New Portfolio Inquiry: ${subject}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #5c4033; margin-top: 0; font-size: 20px;">New Contact Submission</h2>
        <div style="background-color: #faf9f6; padding: 16px; border-radius: 8px; border-left: 4px solid #5c4033; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 4px 0;"><strong>Subject:</strong> ${subject}</p>
        </div>
        <p style="margin-top: 16px;"><strong>Message:</strong></p>
        <p style="background-color: #f8fafc; padding: 14px; border-radius: 6px; white-space: pre-wrap; color: #334155; line-height: 1.5;">${message}</p>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 12px;">Submitted at: ${dateTime}</p>
      </div>
    `,
  });
}

// 2. Professional Auto-Reply sent to VISITOR (No Message Echo)
async function sendAutoReplyEmail({ name, email }) {
  return resend.emails.send({
    from: "Amal Vishnu G <onboarding@resend.dev>",
    to: email,
    subject: "Thank you for reaching out | Amal Vishnu G",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; border: 1px solid #e8ecef; border-radius: 12px; background-color: #faf9f6; color: #2d3748;">
        
        <!-- Header -->
        <div style="padding-bottom: 20px; border-bottom: 1px solid #e2e8f0;">
          <h1 style="color: #5c4033; font-size: 22px; margin: 0; font-weight: 700;">Amal Vishnu G</h1>
          <p style="color: #718096; font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Full Stack MERN Developer</p>
        </div>

        <!-- Body -->
        <div style="padding: 24px 0;">
          <p style="font-size: 16px; font-weight: 600; color: #1a202c; margin-top: 0;">Hi ${name},</p>
          <p style="font-size: 15px; line-height: 1.6; color: #4a5568;">
            Thank you for reaching out through my portfolio website. I have received your message and appreciate you taking the time to connect.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #4a5568;">
            I review all inquiries personally and will get back to you within <strong>24 hours</strong>.
          </p>
        </div>

        <!-- Interactive Links -->
        <div style="background-color: #ffffff; border-radius: 8px; padding: 18px; border: 1px solid #edf2f7; margin-bottom: 24px;">
          <p style="margin: 0 0 12px 0; font-weight: 600; font-size: 13px; color: #2d3748;">Explore my work in the meantime:</p>
          <a href="https://amalvishnu-portfolio.vercel.app" style="display: inline-block; background-color: #5c4033; color: #ffffff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 500; margin-right: 8px;">View Portfolio</a>
          <a href="https://github.com/Amal-vishnu04" style="display: inline-block; background-color: #2d3748; color: #ffffff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 500;">GitHub Profile</a>
        </div>

        <!-- Signature -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
          <p style="margin: 0; font-weight: 600; color: #5c4033; font-size: 15px;">Best regards,</p>
          <p style="margin: 4px 0 0 0; font-size: 14px; color: #4a5568;"><strong>Amal Vishnu G</strong></p>
          <p style="margin: 2px 0 0 0; font-size: 13px; color: #718096;">Full Stack Developer | MERN & AI Solutions</p>
          <p style="margin: 2px 0 0 0; font-size: 12px; color: #a0aec0;">Coimbatore, Tamil Nadu, India</p>
        </div>

      </div>
    `,
  });
}

module.exports = { sendNotificationEmail, sendAutoReplyEmail };