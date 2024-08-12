// static/scripts.js
function sendMessage() {
    let inputBox = document.getElementById("userInput");
    let message = inputBox.value.trim();

    if (message !== "") {
        appendMessage(message, "user-message");
        inputBox.value = ""; // Clear the input box

        // Send the message to the server
        fetch('/get-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            appendMessage(data.response, "bot-message");
        });
    }
}

function appendMessage(message, className) {
    let chatbox = document.getElementById("chatbox");
    let messageElement = document.createElement("div");
    messageElement.className = "message " + className;
    messageElement.textContent = message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
