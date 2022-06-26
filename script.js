let user = {
    name: ""
}
let promise;
let statusChat;

function enterChatOK() {
    console.log(`bombou, ${user.name}`)
    online();
}

function enterChatNOK() {
    alert('Já existe um usuário utilizando este nome, escolha outro!');
    enterChat();
}

function enterChat() {
    user = {
        name: prompt('Seu lindo nome:')
    }
    promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", user);
    promise.then(enterChatOK);
    promise.catch(enterChatNOK);
}

function onlineOK() {
    console.log(`online e roteando! aqui é o seu ${user.name}`);
}

function onlineNOK() {
    console.log('Desconectou aí, chefia?');
}

function online() {
    promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user)
    promise.then(onlineOK);
    promise.catch(onlineNOK);
}

function getMessagesOK(chat) {
    let main = document.querySelector(".main");
    let lastMessage;
    chat = chat.data;
    for (const element of chat) {
        if (element.type === "status") {
            main.innerHTML +=
                `<div class="message status">
            <p>${element.time}<span>${element.from}</span> ${element.text}</p>
        </div>`
        } else if (element.type === "message") {
            main.innerHTML +=
                `<div class="message">
            <p>${element.time}<span>${element.from}</span> para <span>${element.to}</span>: ${element.text}</p>
            </div>`
        } else if (element.type === "private_message" && element.to === user.name) {
            main.innerHTML +=
                `<div class="message private">
            <p>${element.time}<span>${element.from}</span> reservadamente para <span>${element.to}</span>: ${element.text}</p>
            </div>`
        }
    }
    //lastMessage.scrollIntoView(); problema é fazer selecionar a última mensagem
    console.log('chat atualizado');
}

function getMessagesNOK() {
    console.log(`parece que tá vaziozão aqui, ${user.name}`);
}

function getMessages() {
    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(getMessagesOK);
    promise.catch(getMessagesNOK);
}

function sendMessageOK() {
    console.log(`mensagem enviada, seu ${user.name}`);
    document.querySelector('input').value = "";
    getMessages();
}

function sendMessageNOK() {
    console.log(`${user.name}, deu xabu na tua carta`);
    window.location.reload();
}

function sendMessage() {
    let message = {
        from: user.name,
        to: "Todos",
        text: document.querySelector('input').value,
        type: "message"
    }
    console.log(message)
    promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", message);
    promise.then(sendMessageOK);
    promise.catch(sendMessageNOK);
}


enterChat();
let statusOnline = setInterval(online, 5000);
if (enterChatOK) {
    getMessages();
    statusChat = setInterval(getMessages, 3000);
}