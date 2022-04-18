let conversas = [];
const pedeNome = prompt("Digite seu nome: ");
const name = {name: pedeNome};
let destinatario = 'Todos';
let tipoMensagem = 'message'



entradaChat();
pegarConversas();
setInterval(pegarConversas, 1000);
setInterval(manterConexao,4000);
//perguntarNome();
usuariosOnline();

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

      
    promise.then(pegarConversas,1000);
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

function menuLateral(){
    const menu = document.querySelector(".conteiner-bonus");
    menu.classList.remove("esconde");
}

function esconde(){
    const menu = document.querySelector(".conteiner-bonus");
    menu.classList.add("esconde");

}

function usuariosOnline(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");

    promise.then(function(response){
        let contador = 0;
        let users = document.querySelector(".users");
        users.innerHTML ="";

        while(contador < response.data.length){
            users.innerHTML += `<div class="usuario" onclick="selecionar(this)">
            <ion-icon name="people"></ion-icon> <p>${response.data[contador].name}</p><img src="img/Vector.png" alt="selecionado" /></div>`;
            contador++;

        }

        setTimeout(usuariosOnline,10000)
    });

    
}

function selecionar(usuario){
    const usuarioSelecionado = document.querySelector(".selecionado");
   // let toUser = document.querySelector(".destinarario");

    if(usuarioSelecionado !== null){
        usuarioSelecionado.classList.remove("selecionado");

    }

    usuario.classList.add("selecionado");

    if(usuario.classList.contains("selecionado")){
    destinatario = usuario.querySelector('p').innerHTML;
   // toUser.innerHTML = `Enviando para ${destinatario} (reservadamente) dwed`;
    }
}

function selecionarMensagem(mensagem){
    const mensagemSelecionada = document.querySelector(".selecionadoMensagem");
    if( mensagemSelecionada !== null){
        mensagemSelecionada.classList.remove("selecionadoMensagem");

    }

    mensagem.classList.add("selecionadoMensagem");

    tipoMensagem = mensagem.querySelector("p").innerHTML;

}

function destino(){
    const destinatarioT = document.querySelector(".destinatario").innerHTML = `<p>Enviando para ${destinatario} (reservadamente)</p>`;
}
destino();

document.onkeydown = enter;
function enter(event){
    if(event.keyCode === 13){
        enviarMensagem();
    }

    
}

