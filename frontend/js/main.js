document.addEventListener("DOMContentLoaded", () => {

  /* ===================== PRELOADER ===================== */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 500);
  });

  /* ===================== SCROLL PROGRESS BAR ===================== */
  const scrollProgress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + "%";
  });

  /* ===================== NAVBAR SCROLLED STATE ===================== */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ===================== MOBILE MENU TOGGLE ===================== */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  /* ===================== ACTIVE NAV LINK ON SCROLL ===================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinkItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinkItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  /* ===================== ANIMATED COUNTERS ===================== */
  const statNumbers = document.querySelectorAll(".stat-number");
  let countersStarted = false;

  function animateCounters() {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"), 10);
      let current = 0;
      const increment = target / 40; // 40 steps

      const updateCount = () => {
        current += increment;
        if (current < target) {
          stat.textContent = Math.ceil(current);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
          stat.classList.add("counted");
        }
      };
      updateCount();
    });
  }

  // Trigger counters when About section is visible
  const aboutSection = document.getElementById("about");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersStarted) {
          animateCounters();
          countersStarted = true;
        }
      });
    },
    { threshold: 0.3 }
  );
  if (aboutSection) counterObserver.observe(aboutSection);

  /* ===================== FOOTER YEAR ===================== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

});