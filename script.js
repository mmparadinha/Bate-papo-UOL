let user = {
    name: prompt('Seu lindo nome:')
}
let message = {
    from: user,
    to: "Todos",
    text: document.querySelector('input').value,
    type: "mensagem" // deve variar com o tipo de envio
}

let promise;

function enterChatOK() {
    console.log(`bombou, ${user.name}`)
}

function enterChatNOK() {
    alert('Já existe um usuário utilizando este nome, escolha outro!');
    user.name = prompt('Seu novo lindo nome:')
}

function onlineOK() {
    console.log(`online e roteando! aqui é o seu ${user.name}`);
}

function onlineNOK() {
    //alert('Desconectou aí, chefia?');
}

function getMessagesOK(chat) {
    console.log(`olha o que falaram, ${user.name}`);
    console.log(chat.data);

}

function getMessagesNOK() {
    console.log(`parece que tá vaziozão aqui, ${user.name}`);
}

function sendMessageOK() {
    console.log(`mensagem enviada, seu ${user.name}`);
}

function sendMessageNOK() {
    console.log(`${user.name}, deu xabu`);
}

function enterChat() {
    promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", user);
    promise.then(enterChatOK);
    promise.catch(enterChatNOK);
}

function online() {
    promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user)
    promise.then(onlineOK);
    promise.catch(onlineNOK);
}

function getMessages() {
    promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(getMessagesOK);
    promise.catch(getMessagesNOK);
}

function sendMessage() {
    promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", message);
    promise.then(sendMessageOK);
    promise.catch(sendMessageNOK);
}

enterChat();
let status = setInterval(online, 5000);
getMessages();
