document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeDots = document.querySelectorAll(".theme-dot");

  // Load saved theme (if any) or default to theme1
  const savedTheme = localStorage.getItem("portfolio-theme") || "theme1";
  setTheme(savedTheme);

  themeDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const selectedTheme = dot.getAttribute("data-theme");
      setTheme(selectedTheme);
      localStorage.setItem("portfolio-theme", selectedTheme);
    });
  });

  function setTheme(themeName) {
    body.setAttribute("data-theme", themeName);

    themeDots.forEach((dot) => {
      dot.classList.toggle("active", dot.getAttribute("data-theme") === themeName);
    });
  }
});