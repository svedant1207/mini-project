document.addEventListener("DOMContentLoaded", () => {
    const historyList = document.getElementById("history-list");
    const clearBtn = document.getElementById("clear-history");
  
    // Night mode toggle
    const nightModeToggle = document.getElementById("night-mode-toggle");
    nightModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  
    // Load and render translation history from localStorage
    function loadHistory() {
      const history = JSON.parse(localStorage.getItem("translationHistory")) || [];
  
      if (history.length === 0) {
        historyList.innerHTML = `<p class="empty">No translation history yet.</p>`;
        return;
      }
  
      historyList.innerHTML = ""; // Clear previous render
  
      history.reverse().forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("history-item");
        div.innerHTML = `
          <div class="history-content">
            <p><strong>From (${item.fromLang}):</strong> ${item.originalText}</p>
            <p><strong>To (${item.toLang}):</strong> ${item.translatedText}</p>
            <p class="timestamp">${new Date(item.timestamp).toLocaleString()}</p>
          </div>
          <button class="delete-btn" data-index="${index}">🗑️</button>
        `;
        historyList.appendChild(div);
      });
  
      addDeleteListeners();
    }
  
    // Add event listeners to delete buttons
    function addDeleteListeners() {
      document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (e) => {
          const indexToRemove = parseInt(e.target.dataset.index);
          let history = JSON.parse(localStorage.getItem("translationHistory")) || [];
          history.splice(history.length - 1 - indexToRemove, 1); // account for reversed order
          localStorage.setItem("translationHistory", JSON.stringify(history));
          loadHistory();
        });
      });
    }
  
    // Clear all history
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all translation history?")) {
        localStorage.removeItem("translationHistory");
        loadHistory();
      }
    });
  
    loadHistory();
  });