const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const contactLimiter = require("../middleware/rateLimiter");
const { submitContactForm } = require("../controllers/contactController");

router.post(
  "/",
  contactLimiter,
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("subject").trim().notEmpty().withMessage("Subject is required"),
    body("message")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Message must be at least 5 characters"),
  ],
  submitContactForm
);

module.exports = router;