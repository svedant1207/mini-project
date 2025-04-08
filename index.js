// index.js
document.addEventListener("DOMContentLoaded", () => {
    // 🌙 Dark Mode Toggle Setup
    const nightModeToggle = document.getElementById("night-mode-toggle");
    const moonIcon = "🌙";
    const sunIcon = "☀️";
  
    function updateDarkModeUI() {
      if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        nightModeToggle.innerHTML = sunIcon;
      } else {
        document.body.classList.remove("dark-mode");
        nightModeToggle.innerHTML = moonIcon;
      }
    }
  
    updateDarkModeUI();
  
    nightModeToggle.addEventListener("click", () => {
      const enabled = document.body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
      nightModeToggle.innerHTML = enabled ? sunIcon : moonIcon;
    });
  });
  