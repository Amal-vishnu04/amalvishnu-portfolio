document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoader = submitBtn.querySelector(".btn-loader");
  const formStatus = document.getElementById("form-status");

  // 👉 Backend URL — local testing ku idhu, deploy pannும்போது change pannanum
  const API_URL = "http://localhost:5000/api/contact";
  const RECAPTCHA_SITE_KEY = "6LeoJGstAAAAACS0F85y_psp7rJsw8a659ce0fNH";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic client-side validation
    if (!name || !email || !subject || !message) {
      showStatus("Please fill in all fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    // Start loading state
    setLoading(true);
    showStatus("", "");

    try {
      // Generate reCAPTCHA v3 token
      const recaptchaToken = await new Promise((resolve, reject) => {
        if (typeof grecaptcha === "undefined") {
          reject(new Error("reCAPTCHA script not loaded"));
          return;
        }
        grecaptcha.ready(() => {
          grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: "contact_form" })
            .then((token) => resolve(token))
            .catch(reject);
        });
      });

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, recaptchaToken }),
      });

      const data = await response.json();

      if (data.success) {
        showStatus("✅ Message sent successfully! I'll get back to you soon.", "success");
        form.reset();
      } else {
        const errorMsg =
          data.error || (data.errors && data.errors[0]?.msg) || "Something went wrong. Try again.";
        showStatus("❌ " + errorMsg, "error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      showStatus("❌ Could not connect to server. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  });

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnLoader.hidden = !isLoading;
    btnText.textContent = isLoading ? "Sending..." : "Send Message";
  }

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = "form-status " + type;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});