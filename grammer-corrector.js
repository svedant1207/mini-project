document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("grammar-input");
    const outputText = document.getElementById("grammar-output");
    const checkBtn = document.getElementById("checkGrammarBtn");
    const body = document.body;
  
  // 🌙 Dark Mode Toggle
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
    // Grammar check button click
    checkBtn.addEventListener("click", () => {
      const text = inputText.value.trim();
  
      if (!text) {
        outputText.value = "Please enter some text first.";
        return;
      }
  
      outputText.value = "Checking grammar...";
  
      setTimeout(() => {
        const correctedText = simulateGrammarCorrection(text);
        outputText.value = correctedText;
      }, 800);
    });
  
    // Simulated grammar correction logic
    function simulateGrammarCorrection(text) {
      let corrected = text;
  
      corrected = corrected.replace(/\bi am\b/gi, "I am");
      corrected = corrected.replace(/\bi\b/g, "I");
      corrected = corrected.replace(/\bim\b/gi, "I'm");
      corrected = corrected.replace(/\bdont\b/gi, "don't");
      corrected = corrected.replace(/\bcant\b/gi, "can't");
      corrected = corrected.replace(/\bdoesnt\b/gi, "doesn't");
      corrected = corrected.replace(/\bwont\b/gi, "won't");
      corrected = corrected.replace(/\bcould of\b/gi, "could have");
      corrected = corrected.replace(/\bshould of\b/gi, "should have");
      corrected = corrected.replace(/\bwould of\b/gi, "would have");
  
      // Capitalize first letter if not already
      corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
  
      return corrected;
    }
  });
  