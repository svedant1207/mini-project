// notepad.js
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
  
    // 📝 Notepad Functionality
    const noteInput = document.getElementById("note-input");
    const saveNoteBtn = document.getElementById("save-note-btn");
    const clearNoteBtn = document.getElementById("clear-note-btn");
    const notesList = document.getElementById("notes-list");
    const searchInput = document.getElementById("search-notes");
  
    function loadNotes() {
      notesList.innerHTML = "";
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  
      notes.forEach((note, index) => {
        const li = document.createElement("li");
        li.textContent = note;
        li.dataset.index = index;
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.onclick = () => {
          notes.splice(index, 1);
          localStorage.setItem("notes", JSON.stringify(notes));
          loadNotes();
        };
  
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
      });
    }
  
    saveNoteBtn.addEventListener("click", () => {
      const text = noteInput.value.trim();
      if (!text) {
        alert("Cannot save an empty note!");
        return;
      }
  
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
      notes.push(text);
      localStorage.setItem("notes", JSON.stringify(notes));
      noteInput.value = "";
      loadNotes();
    });
  
    clearNoteBtn.addEventListener("click", () => {
      noteInput.value = "";
    });
  
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
  
      notesList.innerHTML = "";
      notes.forEach((note, index) => {
        if (note.toLowerCase().includes(keyword)) {
          const li = document.createElement("li");
          li.textContent = note;
          li.dataset.index = index;
  
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "❌";
          deleteBtn.style.marginLeft = "10px";
          deleteBtn.onclick = () => {
            notes.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            loadNotes();
          };
  
          li.appendChild(deleteBtn);
          notesList.appendChild(li);
        }
      });
    });
  
    loadNotes();
  
    // 🎤 Speech-to-Text
    const speechBtn = document.getElementById("speech-to-text-btn");
    if (speechBtn && 'webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
  
      speechBtn.addEventListener("click", () => {
        recognition.start();
      });
  
      recognition.onresult = (event) => {
        noteInput.value += event.results[0][0].transcript;
      };
  
      recognition.onerror = () => {
        alert("Speech recognition error.");
      };
    }
  });
  