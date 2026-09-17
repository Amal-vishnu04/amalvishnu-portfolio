document.addEventListener("DOMContentLoaded", () => {

  /* ===================== SCROLL REVEAL ===================== */
  const revealElements = document.querySelectorAll(
    ".section-header, .about-text, .about-stats, .skill-category, .service-card, .timeline-item, .project-card, .education-card, .cert-card, .contact-info, .contact-form"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ===================== MOUSE-FOLLOW GLOW (Hero section) ===================== */
  const hero = document.querySelector(".hero");
  if (hero) {
    const glow = document.createElement("div");
    glow.id = "mouse-glow";
    hero.appendChild(glow);

    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = x + "px";
      glow.style.top = y + "px";
    });
  }

  /* ===================== CARD TILT EFFECT ===================== */
  const tiltCards = document.querySelectorAll(".project-card, .service-card, .skill-category");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4; // max 4deg
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  /* ===================== PROJECT GALLERY SLIDER ===================== */
  const galleries = document.querySelectorAll(".project-gallery");

  galleries.forEach((gallery) => {
    const images = gallery.querySelectorAll(".gallery-img");
    const dots = gallery.querySelectorAll(".dot");
    const prevBtn = gallery.querySelector(".gallery-prev");
    const nextBtn = gallery.querySelector(".gallery-next");
    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
      images.forEach((img) => img.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      images[index].classList.add("active");
      dots[index].classList.add("active");
      currentIndex = index;
    }

    function nextSlide() {
      const nextIndex = (currentIndex + 1) % images.length;
      showSlide(nextIndex);
    }

    function prevSlide() {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      showSlide(prevIndex);
    }

    // Arrow clicks
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    // Dot clicks
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        showSlide(i);
        resetAutoSlide();
      });
    });

    // Auto-slide every 4 seconds
    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    startAutoSlide();

    // Pause auto-slide on hover
    gallery.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
    gallery.addEventListener("mouseleave", startAutoSlide);
  });

});