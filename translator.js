document.addEventListener("DOMContentLoaded", () => {
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
  
    // 🧭 Input/Output Fields
    const inputLang = document.getElementById("input-lang");
    const outputLang = document.getElementById("output-lang");
    const inputText = document.getElementById("input-text");
    const outputText = document.getElementById("output-text");
  
    // 💾 Save to History
    function saveToHistory(originalText, translatedText, fromLang, toLang) {
      if (!originalText || !translatedText || !fromLang || !toLang) return;
  
      const history = JSON.parse(localStorage.getItem("translationHistory")) || [];
      history.push({
        originalText,
        translatedText,
        fromLang,
        toLang,
        timestamp: new Date().toISOString()
      });
  
      // Limit to 50 recent entries
      if (history.length > 20) history.shift();
  
      localStorage.setItem("translationHistory", JSON.stringify(history));
    }
  
    // 🌍 Translation (Placeholder Logic)
    window.startTranslation = function () {
      const input = inputText.value.trim();
      if (!input) {
        alert("Please enter some text to translate.");
        return;
      }
  
      const translated = `[Translated]: ${input}`; // Simulated translation
      outputText.value = translated;
  
      // Save to history
      saveToHistory(input, translated, inputLang.value, outputLang.value);
    };
  
    // ⇄ Swap Languages & Text
    const swapBtn = document.getElementById("swap-languages");
    if (swapBtn) {
      swapBtn.addEventListener("click", () => {
        [inputLang.value, outputLang.value] = [outputLang.value, inputLang.value];
        [inputText.value, outputText.value] = [outputText.value, inputText.value];
      });
    }
  
    // 🧹 Clear Button
    const clearBtn = document.getElementById("clear-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        inputText.value = "";
        outputText.value = "";
      });
    }
  
    // 📋 Copy Button
    const copyBtn = document.getElementById("copy-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const text = outputText.value.trim();
        if (!text) {
          alert("No text to copy!");
          return;
        }
  
        navigator.clipboard.writeText(text)
          .then(() => {
            copyBtn.innerText = "✅ Copied!";
            setTimeout(() => (copyBtn.innerText = "📋 Copy"), 1500);
          })
          .catch(() => alert("Copy failed."));
      });
    }
  
    // 🎤 Speech-to-Text
    const speechBtn = document.getElementById("speech-btn");
    if (speechBtn && 'webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = inputLang.value;
      recognition.continuous = false;
  
      speechBtn.addEventListener("click", () => {
        recognition.start();
      });
  
      recognition.onresult = event => {
        inputText.value = event.results[0][0].transcript;
      };
  
      recognition.onerror = () => {
        alert("Speech recognition error.");
      };
    }
  
    // 🔊 Text-to-Speech
    const listenBtn = document.getElementById("listen-btn");
    if (listenBtn) {
      listenBtn.addEventListener("click", () => {
        const text = outputText.value;
        if (!text) {
          alert("Nothing to read.");
          return;
        }
  
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = outputLang.value;
        speechSynthesis.speak(utterance);
      });
    }
  });