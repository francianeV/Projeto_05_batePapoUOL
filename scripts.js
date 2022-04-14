let conversas = [];

pegarConversas();
setInterval(pegarConversas, 3000);
//scroll();

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
            <li><span class="time">${conversas[i].time}&nbsp</span> <span class="from"> ${conversas[i].from}&nbsp</span> <span class="text"> ${conversas[i].text} </span></li>
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


//function scroll(){

//}
