let conversas = [];
const pedeNome = prompt("Digite seu nome: ");
const name = {name: pedeNome};
let destinatario = "Todos";
let tipoMensagem = 'message';



entradaChat();
pegarConversas();
setInterval(pegarConversas, 1000);
setInterval(manterConexao,4000);
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
        if(conversas[i].to === "Todos"){
        ulMensagems.innerHTML += `
            <li class="reservada"><span class="time">${conversas[i].time}&nbsp&nbsp</span> <span class="from"> ${conversas[i].from}&nbsp&nbsp</span> reservadamente para &nbsp<span class="from">${conversas[i].to}:&nbsp&nbsp</span><span class="text"> ${conversas[i].text} </span></li>
        `;
        } 
        if(conversas[i].to === pedeNome){
            ulMensagems.innerHTML += `
            <li class="reservada"><span class="time">${conversas[i].time}&nbsp&nbsp</span> <span class="from"> ${conversas[i].from}&nbsp&nbsp</span> reservadamente para &nbsp<span class="from">${conversas[i].to}:&nbsp&nbsp</span><span class="text"> ${conversas[i].text} </span></li>
        `;
        }

        if(conversas[i].from === pedeNome){
            ulMensagems.innerHTML += `
            <li class="reservada"><span class="time">${conversas[i].time}&nbsp&nbsp</span> <span class="from"> ${conversas[i].from}&nbsp&nbsp</span> reservadamente para &nbsp<span class="from">${conversas[i].to}:&nbsp&nbsp</span><span class="text"> ${conversas[i].text} </span></li>
        `;
        }
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
    promise.catch(tratarErro);
    
}
function tratarErro(error){
    
    let status = error.response.status;
    console.log(status);
    if(status === 400){
        outroNome();
    }
}

function outroNome(response){

    alert("Nome em uso!");
    const pedeNome = prompt("Digite outro nome: ");
    
}

function manterConexao(){
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",name);

    promise.then(pegarConversas);
}

function enviarMensagem(){
    console.log('indo');
    const mensagem = document.querySelector("input").value;

    const mensagemT = {from: pedeNome,
	to: destinatario,
	text: mensagem,
	type: tipoMensagem};

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mensagemT);
        
      
    promise.then(pegarConversas,1000);
    promise.catch(erroMensagem);


}

function erroMensagem(error){
    if(error.response.status !== 200){
        alert("Usuário não esta mais online");
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
    
    if(usuarioSelecionado !== null){
        usuarioSelecionado.classList.remove("selecionado");

    }

    usuario.classList.add("selecionado");
    destinatario = usuario.querySelector("p").innerHTML;

    if(destinatario === "Todos"){
        document.querySelector(".publica").classList.add("selecionadoMensagem");
        document.querySelector(".privado").classList.remove("selecionadoMensagem");
        tipoMensagem = "message"
        document.querySelector(".destinatario").innerHTML = `Enviando para ${destinatario} publicamente`;
    }else{
        selecionarMensagem();
        //document.querySelector(".privado").classList.add("selecionadoMensagem");
        //document.querySelector(".publica").classList.remove("selecionadoMensagem");
        //tipoMensagem = "private_message";
        
    }

}

function selecionarMensagem(selecionaMensagem){
const selecionandoMensagem = document.querySelector(".selecionadoMensagem");
    
    if(selecionandoMensagem !== null){
        selecionandoMensagem.classList.remove("selecionadoMensagem");

    }

    selecionaMensagem.classList.add("selecionadoMensagem");
    tipoMensagem = selecionaMensagem.querySelector("p").innerHTML;

    if(tipoMensagem === "Público"){
        tipoMensagem = "message";
        document.querySelector(".destinatario").innerHTML = `Enviando para ${destinatario} publicamente`;
    }else{
        tipoMensagem = "private_message";
        document.querySelector(".destinatario").innerHTML = `Enviando para ${destinatario} (reservadamente)`;
    }

    
}

document.querySelector(".destinatario").innerHTML = `Enviando para ${destinatario} publicamente`;

document.onkeydown = enter;
function enter(event){
    if(event.keyCode === 13){
        enviarMensagem();
        document.querySelector("input").value = "";
    }

    
}

