const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Email sent to YOU (Amal)
async function sendNotificationEmail({ name, email, subject, message }) {
  const dateTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  return resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: process.env.RECEIVER_EMAIL || "amalvishnu21702@gmail.com",
    replyTo: email,
    subject: `📩 New Portfolio Contact Message from ${name}`,
    html: `
      <h2>You have received a new message from your portfolio website.</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
      <p><strong>Date:</strong> ${dateTime}</p>
    `,
  });
}

// Auto-reply sent to the VISITOR
async function sendAutoReplyEmail({ name, email }) {
  return resend.emails.send({
    from: "Amal Vishnu G <onboarding@resend.dev>",
    to: email,
    subject: "Thank you for contacting Amal Vishnu G",
    html: `
      <p>Hello ${name},</p>
      <p>Thank you for reaching out through my portfolio website.</p>
      <p>I have received your message and will get back to you as soon as possible.</p>
      <br/>
      <p>Best Regards,<br/>
      Amal Vishnu G<br/>
      Full Stack MERN Developer</p>
    `,
  });
}

module.exports = { sendNotificationEmail, sendAutoReplyEmail };