// ====== Night Mode ======
document.getElementById("night-mode-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  
  // ====== Tone Transformation Logic ======
  const tonePresets = {
    formal: (text) => `Dear Sir/Madam,\n\n${text.replace(/\bi'm\b/gi, "I am").replace(/\bcan't\b/gi, "cannot").replace(/\bwon't\b/gi, "will not")}\n\nSincerely,`,
    casual: (text) => `${text.replace(/\byou are\b/gi, "you're").replace(/\bdo not\b/gi, "don't").replace(/\bcannot\b/gi, "can't")} 🙂`,
    friendly: (text) => `Hey there! 👋\n\n${text}\n\nCheers! 😄`,
    sarcastic: (text) => `Oh wow, that's *definitely* the most brilliant idea ever. 🙄\n\n"${text}"`,
    poetic: (text) => `In gentle words, let meaning flow,\nAs petals dance where soft winds blow:\n\n"${text}"`,
  };
  
  function changeTone(tone) {
    const input = document.getElementById("inputText").value.trim();
    const output = document.getElementById("tone-output");
  
    if (!input) {
      alert("Please enter some text first.");
      return;
    }
  
    // Simulate processing delay
    output.value = "Transforming text...";
    setTimeout(() => {
      const toneFunc = tonePresets[tone];
      if (toneFunc) {
        output.value = toneFunc(input);
      } else {
        output.value = input;
      }
    }, 500);
  }
  
// Copy
document.getElementById("copy-btn").addEventListener("click", () => {
    const output = document.getElementById("tone-output").value;
    if (output) {
      navigator.clipboard.writeText(output);
      alert("Copied!");
    }
  });
  
  // Clear
  document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("inputText").value = "";
    document.getElementById("tone-output").value = "";
  });
  
  // Speak
  document.getElementById("listen-btn").addEventListener("click", () => {
    const text = document.getElementById("tone-output").value;
    if (!text) {
      alert("Nothing to speak.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  });
   
  // ====== Keyboard Shortcuts ======
  document.addEventListener("keydown", (e) => {
    const ctrl = e.ctrlKey || e.metaKey;
    if (ctrl && e.key === "Enter") {
      changeTone("formal");
    } else if (ctrl && e.key === "l") {
      document.getElementById("inputText").value = "";
      document.getElementById("tone-output").value = "";
    }
  });