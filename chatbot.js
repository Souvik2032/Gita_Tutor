// chatbot.js
document.addEventListener("DOMContentLoaded", function () {
    const chatWidget = document.getElementById("chat-widget");
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatOutput = document.getElementById("chat-output");
    const minimizeBtn = document.getElementById("chat-minimize");
  
    // Toggle minimize/maximize
    minimizeBtn.addEventListener("click", function () {
      chatWidget.classList.toggle("minimized");
      // Change button icon/text depending on state
      if (chatWidget.classList.contains("minimized")) {
        minimizeBtn.innerHTML = "&#9650;"; // Up arrow to restore
      } else {
        minimizeBtn.innerHTML = "_"; // Underscore for minimize
      }
    });
  
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const message = chatInput.value.trim();
      if (message === "") return;
  
      appendMessage("User", message);
      chatInput.value = "";
  
      // Send query to the backend API (adjust URL if needed)
      fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
      })
        .then(response => response.json())
        .then(data => {
          appendMessage("Bot", data.response);
        })
        .catch(error => {
          console.error("Error:", error);
          appendMessage("Bot", "Error connecting to chatbot.");
        });
    });
  
    function appendMessage(sender, message) {
      const messageElem = document.createElement("div");
      messageElem.className = "message " + sender.toLowerCase();
      messageElem.innerHTML = `<strong>${sender}:</strong> ${message}`;
      chatOutput.appendChild(messageElem);
      chatOutput.scrollTop = chatOutput.scrollHeight;
    }
  });
  