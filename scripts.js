let conversas = [];
const pedeNome = prompt("Digite seu nome: ");
const name = {name: pedeNome};



entradaChat();
pegarConversas();
setInterval(pegarConversas, 3000);
setInterval(manterConexao,4000);

function pegarConversas(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    console.log(promise);

    promise.then(carregarDados);

    const elemento = document.querySelector(".corpo-mensagens");
    elemento.scrollIntoView(false);
    
}

function carregarDados(response){
    console.log(response.data);
    conversas = response.data;
    renderizarConversas();

}

function renderizarConversas(){
    const ulMensagems = document.querySelector(".corpo-mensagens");
    ulMensagems.innerHTML = "";

    for (let i = 0; i < conversas.length; i++) {
        ulMensagems.innerHTML += `
            <li><span class="time">${conversas[i].time}&nbsp&nbsp</span> <span class="from"> ${conversas[i].from}&nbsp&nbsp</span> <span class="text"> ${conversas[i].text} </span></li>
        `;
    }
}
/*
function comparaMensagens(){
    if(conversas[i].text === "entra na sala..." || conversas[i].text === "sai da sala..."){
        let elemento = elemento.document.querySelectorAll(".corpo-mensagens .li");
        elemento.style.background = "gray";
        
    }
}
*/

function entradaChat(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",name);

    promise.then(pegarConversas);
   // promise.catch(tratarErro);
    
}
/*
function tratarErro(error){

    if(error.response.status === 400){
        pedeNome = prompt("digite outro nome: ");
    }else{
        return pegarConversas();
    }

}
*/

function manterConexao(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",name);

    promise.then(pegarConversas);
}