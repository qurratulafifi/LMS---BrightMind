document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-chat");
    const closeBtn = document.getElementById("close-chat");
    const chatPopup = document.getElementById("chat-popup");
    const sendBtn = document.getElementById("send-chat");
    const input = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");

    chatBody.innerHTML = '<div class="message from-them">Hello! How can we help you?</div>';
    showHelpOptions();
    function showHelpOptions() {
        const helpMessage = document.createElement("div");
        helpMessage.classList.add("message", "from-them");
        helpMessage.innerHTML = `What can I help you with?<br><br>
  <button class="quick-reply" data-answer="course">📄 Access my course</button><br>
  <button class="quick-reply" data-answer="submit">📝 Submit assignment</button><br>
  <button class="quick-reply" data-answer="update">👤 Update profile</button><br>
  <button class="quick-reply" data-answer="clear">🗑️ Clear chat</button>`;

        chatBody.appendChild(helpMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("quick-reply")) {
            const type = e.target.getAttribute("data-answer");

            // Simulate user clicking
            const userMsg = document.createElement("div");
            userMsg.classList.add("message", "from-me");
            userMsg.textContent = e.target.textContent;
            chatBody.appendChild(userMsg);

            // Auto reply
            const botReply = document.createElement("div");
            botReply.classList.add("message", "from-them");

            if (type === "course") {
                botReply.textContent = "✅ To access your course, go to the 'Courses' section in the sidebar and click on any course to view it.";
            } else if (type === "submit") {
                botReply.textContent = "📤 Assignments can be submitted inside the course page. Look for a 'Submit Assignment' button.";
            } else if (type === "update") {
                botReply.innerHTML = `👤 To update your profile, go to <a href="profile.html" class="inline-option-btn">your profile</a> and click on <strong>Update Profile</strong>.`;
            } else if (type === "clear") {
                chatBody.innerHTML = '<div class="message from-them">Chat cleared. How can we help you next?</div>';
                localStorage.removeItem("chatHistory");
                showHelpOptions();
                return;
            }


            chatBody.appendChild(botReply);
            chatBody.scrollTop = chatBody.scrollHeight;

            // Remove help buttons after selection
            e.target.parentElement.remove();
        }
    });

    openBtn.addEventListener("click", () => {
        chatPopup.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
        chatPopup.classList.add("hidden");
    });

    sendBtn.addEventListener("click", () => {
        const text = input.value.trim();
        if (text !== "") {
            const msg = document.createElement("div");
            msg.classList.add("message", "from-me");
            msg.textContent = text;
            chatBody.appendChild(msg);
            input.value = "";
            chatBody.scrollTop = chatBody.scrollHeight;

            // Dummy bot reply + re-show options
            setTimeout(() => {
                const reply = document.createElement("div");
                reply.classList.add("message", "from-them");
                reply.textContent = "Thanks for your message!";
                chatBody.appendChild(reply);
                chatBody.scrollTop = chatBody.scrollHeight;

                // 🟢 Re-show the quick reply options after the reply
                showHelpOptions();
            }, 800);
        }
    });

    document.getElementById("clear-chat").addEventListener("click", () => {
        if (confirm("Clear all chat messages?")) {
            chatBody.innerHTML = "";
            localStorage.removeItem("chatHistory");

            // Re-show welcome and help
            chatBody.innerHTML = '<div class="message from-them">Hello! How can we help you?</div>';
            showHelpOptions();
        }
        else if (type === "clear") {
            chatBody.innerHTML = '<div class="message from-them">Chat cleared. How can we help you next?</div>';
            localStorage.removeItem("chatHistory");
            showHelpOptions();
            return;
        }

    });

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendBtn.click();
        }
    });

});

