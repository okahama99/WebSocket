var socket = new WebSocket("ws://localhost:8080/chat");

let count = 1;
var sender;
var receiver;

socket.onopen = function (event) {
    clearChatContainer();
};

socket.onmessage = function (event) {
    var tmp = event.data.toString().split(":");
    var receivedMessage = event.data;
    if (count == 0) {
        if(tmp[0] != sender){
            displayMessage(receivedMessage, 'received-message');
            receiver = tmp[0];
        }
    }else{
        count--;
        sender = tmp[0];
    }

};

document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("message").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    var message = document.getElementById("message").value.trim();
    if (message !== "") {
        socket.send(message);
        displayMessage(message, 'sent-message');
        document.getElementById("message").value = "";
    }
}

function displayMessage(message, messageType) {
    var chatContainer = document.getElementById("chat-container");
    var messageElement = document.createElement("div");
    if (messageType == "received-message") {
        messageElement.classList.add('message', 'received-message');
    } else {
        messageElement.classList.add('message', 'sent-message');
    }

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    var contentElement = document.createElement("p");
    contentElement.textContent = message;

    var timestampElement = document.createElement("span");
    timestampElement.classList.add('timestamp');
    timestampElement.textContent = getCurrentTime(); // Add timestamp

    messageElement.appendChild(contentElement);
    messageElement.appendChild(timestampElement);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes
    return hours + ':' + minutes + ' ' + ampm;
}

function clearChatContainer() {
    var chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML = "";
}
