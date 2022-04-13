let conversas = [];

pegarConversas();

function pegarConversas(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    console.log(promise);

    promise.then(carregarDados);
    
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
            <li>${conversas[i].time} ${conversas[i].from} ${conversas[i].text}</li>
        `;
    }
}

function comparaMensagens(){
    if(conversas[i].text === "Entra na sala..."){
        
    }
}