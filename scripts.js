let conversas = [];
const pedeNome = prompt("Digite seu nome: ");
const name = {name: pedeNome};



entradaChat();
pegarConversas();
setInterval(pegarConversas, 3000);
setInterval(manterConexao,4000);
//perguntarNome();

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
        if(conversas[i].type === "message"){
        ulMensagems.innerHTML += `
            <li class="normal"><span class="time">${conversas[i].time}&nbsp&nbsp</span> <span class="from"> ${conversas[i].from}&nbsp&nbsp</span> para&nbsp<span class="from"> ${conversas[i].to}:&nbsp&nbsp</span>  <span class="text"> ${conversas[i].text} </span></li>
        `;
    }else if(conversas[i].type === "private_message"){
        ulMensagems.innerHTML += `
            <li class="reservada"><span class="time">${conversas[i].time}&nbsp&nbsp</span> <span class="from"> ${conversas[i].from}&nbsp&nbsp</span> reservadamente &nbsp para &nbsp<span class="from">${conversas[i].to}:&nbsp&nbsp</span><span class="text"> ${conversas[i].text} </span></li>
        `;
    }else if(conversas[i].type === "status"){
        ulMensagems.innerHTML += `
            <li class="status"><span class="time">${conversas[i].time}&nbsp&nbsp</span> <span class="from"> ${conversas[i].from}&nbsp&nbsp</span><span class="text"> ${conversas[i].text} </span></li>
        `;
    }
}
}

function entradaChat(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",name);

    promise.then(pegarConversas);
    //promise.catch(tratarErro);
    
}
/*
function tratarErro(error){
    
    //const pedeNome = prompt("Digite seu nome: ");
   
    while(pedeNome === error.response.from){
        const pedeNome = prompt("Digite seu nome: ");
    }

    return pegarConversas();
}
*/
function manterConexao(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",name);

    promise.then(pegarConversas);
}

function enviarMensagem(){
    console.log('indo');
    const mensagem = document.querySelector("input").value;

    const mensagemT = {from: pedeNome,
	to: "Todos",
	text: mensagem,
	type: "message"};

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mensagemT);

    mensagem.addEventListener('keydown', (event) => {
        const keyName = event.key;
        alert('keydown event\n\n' + 'key: ' + keyName);
      });
      
    promise.then(pegarConversas);
    promise.catch(erroMensagem);


}

function erroMensagem(error){
    if(error.response.status !== 200){
        window.location.reload()
    }
    return enviarMensagem();

}

function limpar() {
    document.querySelector("input").value = "";
}

