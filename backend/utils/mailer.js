const nodemailer = require("nodemailer");

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password (not normal password)
  },
});

// Email sent to YOU (Amal) when someone submits the form
async function sendNotificationEmail({ name, email, subject, message }) {
  const dateTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
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
  };

  return transporter.sendMail(mailOptions);
}

// Auto-reply sent to the VISITOR
async function sendAutoReplyEmail({ name, email }) {
  const mailOptions = {
    from: `"Amal Vishnu G" <${process.env.EMAIL_USER}>`,
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
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendNotificationEmail, sendAutoReplyEmail };