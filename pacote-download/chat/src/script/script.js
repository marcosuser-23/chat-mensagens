const listaDeContatos = [
    {
        id: 1,
        nome: "Joaquim",
        ultimaMensagem: "Olá, vamos programar?",
        horarioUltimaMensagem: "20:20",
        avatar: "./src/assets/images/jessica--drew.png",
        conversas: [
            {mensagem:"Oi, eu sou no novo programador!", tipo: "recebida", horario: "20:20"},
            {mensagem:"Que legal, eu também sou!", tipo: "enviada", horario: "20:20"},
            {mensagem:"Vamos codar juntos?", tipo: "recebida", horario: "20:20"},
        ],
    },
    {
        id: 2,
        nome: "Maria",
        ultimaMensagem: "Quer programar comigo?",
        horarioUltimaMensagem: "13:45",
        avatar: "./src/assets/images/david--moore.png",
        conversas: [
            {mensagem:"Oi, eu sou no novo programador!", tipo: "recebida", horario: "20:20"},
            {mensagem:"Que legal, eu também sou!", tipo: "enviada", horario: "20:20"},
            {mensagem:"Vamos codar juntos?", tipo: "recebida", horario: "20:20"},
        ],
    },
    {
        id: 3,
        nome: "João",
        ultimaMensagem: "Eu sou o novo programador?",
        horarioUltimaMensagem: "19:10",
        avatar: "./src/assets/images/greg--james.png",
        conversas: [
            {mensagem:"Oi, eu sou no novo programador!", tipo: "recebida", horario: "20:20"},
            {mensagem:"Que legal, eu também sou!", tipo: "enviada", horario: "20:20"},
            {mensagem:"Vamos codar juntos?", tipo: "recebida", horario: "20:20"},
        ],
    },
    {
        id: 4,
        nome: "José",
        ultimaMensagem: "Tem café",
        horarioUltimaMensagem: "10:20",
        avatar: "./src/assets/images/emily--dorson.png",
        conversas: [
            {mensagem:"Oi, eu sou no novo programador!", tipo: "recebida", horario: "20:20"},
            {mensagem:"Poxa, acho que vou fazer um café!", tipo: "enviada", horario: "20:20"},
            {mensagem:"Eu quero café também!", tipo: "recebida", horario: "20:20"},
        ],
    },
];

//DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Minha página carregou!");
    // Quando trabalhamos com ID utilizamos o #
    // Quando trabalhamos com Classes utilizamos o .
    // querySelector - seleciona o primeiro elemento que ele encontra que foi passado
    // querySelectorAll - sleciona todos os elementos que foram encontrados 

    let abaFocada = true;
    const tituloOriginal = document.title;

    const inputMsg = document.querySelector("#inputMensagem");
    console.log(inputMsg);

    inputMsg.placeholder = "Digite a sua mensagem";

    const buttons = document.querySelectorAll(".cursor--pointer");
    console.log(buttons);

    const buttonSend = document.querySelector(".cursor--pointer[src*='send']");
    console.log(buttonSend);

    const listaMensagens = document.querySelector(".div--messages");
    console.log(listaMensagens);

    const inputBuscaContato = document.querySelector(
        ".div--search input[type='search']"
    );
    console.log(inputBuscaContato);

    const inputBuscaMensagem = document.getElementById("search-message");
    console.log(inputBuscaMensagem);

    inputBuscaMensagem.addEventListener("input", () => {
        const termoDeBusca = inputBuscaMensagem.value;
        console.log(`O termo buscado foi: ${termoDeBusca}`);
        buscarMensagem(termoDeBusca);
    });

    inputBuscaContato.addEventListener("input", () => {
        const termoDeBusca = inputBuscaContato.value;
        console.log(`O termo buscado foi: ${termoDeBusca}`);
        carregarContatos(termoDeBusca);
    });

   // buttonSend.classList.add("minha-classe-modulo-um");

   listaMensagens.addEventListener("click", (event) => {
    if (event.target.classList.contains("emojis-reaction")) {
        const mensagem = event.target.closest('.message');
        abrirMenuReacao(mensagem);
    }
   });

   // let -> permite uma nova atribuição a ela
   // const -> não permite uma nova atribuição a ela

   window.addEventListener("blur", () => {
    abaFocada = false;
    document.title = "O Chat saiu";
   });
   window.addEventListener("focus", () => {
    abaFocada = true;
    document.title = "O Chat voltou";
   });

   const listaEmojis = ["&#128512;", "&#128514;", "&#128513;"];
   const listaEmojis2 = ["😀", "😂", "😁"];

   function abrirMenuReacao(mensagem) {
    console.log(mensagem);
    const areaEmojis = mensagem.querySelector(".area-emojis");

    listaEmojis2.forEach((emoji) => {
        const emojiElement = document.createElement("span");
        emojiElement.classList.add("emoji-opcao", "cursor--pointer");
        // innerText - renderiza o texto sem formatação
        // innerHTML - renderiza o HTML
        // textContent - renderiza o texto com formatação

       // emojiElement.innerHTML = emoji;
        emojiElement.textContent = emoji;

        emojiElement.addEventListener("click", () => {
            console.log(mensagem);
            console.log(emoji);
            alternarEmoji(mensagem, emoji);
        });

        areaEmojis.appendChild(emojiElement);
    });
   }

   function alternarEmoji(mensagem, emoji) {
    let reacaoExistente = mensagem.querySelector(".emoji-selecionado");

    if (reacaoExistente && reacaoExistente.textContent.includes(emoji)) {
        reacaoExistente.textContent = reacaoExistente.textContent.replace(emoji, "");
       // const texto = "";
        //const texto2 = " ";
        if (reacaoExistente.textContent.trim() === "") {
            reacaoExistente.remove();
        }
    } else {
        if (!reacaoExistente) {
            reacaoExistente = document.createElement("div");
            reacaoExistente.classList.add("emoji-selecionado");
            mensagem.appendChild(reacaoExistente);
        }
        reacaoExistente.textContent += emoji;
    }
   }

   const respostasParaOBot = [
    "Olá, tudo bem?",
    "Como você está?",
    "Qual o seu nome?",
    "Meu nome é O Novo BOT",
    "Eu faço o curso do Novo Programador",
    "Você quer conversar comigo?"
   ];

   function buscarMensagem(termo) {
    let encontrouMensagem = false;
    const mensagemElement = document.querySelectorAll(".message");
   // console.log(mensagemElement);
    mensagemElement.forEach((mensagem) => {
        const textoOriginal = mensagem.innerText;
        const textoNormalizado = textoOriginal.toLocaleLowerCase();
        const termoNormalizado = termo.toLocaleLowerCase();

        if (textoNormalizado.includes(termoNormalizado)) {
            encontrouMensagem = true;

            const textoDestacado = textoOriginal.replace(
                new RegExp(`(${termo})`, "gi"),
                `<span class='highlight'>$1</span>`
            ); 
            // REPLACE - Substitui uma coisa por outra, mas somente o primeiro item que ele encontrou
            console.log(textoDestacado);
            
            mensagem.innerHTML = textoDestacado;
            mensagem.style.display = "block"; // Exibir a mensagem
        } else {
            mensagem.style.display = "none"; // Ocultar a mensagem
        }
    });

    if (!encontrouMensagem && termo != "") {
        listaMensagens.innerHTML = "<div>Não houve resultados</div>";

    }else if (termo === "") {
        mensagemElement.forEach((mensagem) => {
            mensagem.style.display = "block";
            mensagem.innerHTML = mensagem.innerText;
        });
    }

   }

   function enviarMensagem() {
    const texto = inputMsg.value.trim();  // TRIM - remove os espaços em branco da string

    if (texto === "") {
        alert('Não possui mensagem ainda!');
    } else {
       const mensagemRenderizda = renderizarMensagem("enviada", texto, "21:00");
       listaMensagens.appendChild(mensagemRenderizda);
        inputMsg.value = "";

        // setTimeout - Executa alguma coisa apenas uma única vez, após um intervalo de tempo
        // setInterval - Executa alguma coisa em um intervalo de tempo

        setTimeout(responderMensagem, 3000);
    }
   }

   function responderMensagem() {
    const posicao = Math.floor(Math.random() * respostasParaOBot.length);   // Multiplicação do n° aleatório pelo tamanho do array
    // Math.floor - arredonda os números quebrados para inteiros
    // Math.random - gera um número aleatório
    const mensagemDoBot = respostasParaOBot[posicao];
    const mensagemRenderizda = renderizarMensagem("recebida", mensagemDoBot, "21:10");
    listaMensagens.appendChild(mensagemRenderizda);
    notificarNovaMensagem();
   }

  /* function adicionarMensagem(tipoMensagem, texto) {
    const mensagemElement = document.createElement("div");

    mensagemElement.classList.add("message", "fade-in");

    if (tipoMensagem === "enviada") {
        mensagemElement.classList.add('you');
    } else {
        mensagemElement.classList.add('other');
    }
    mensagemElement.innerText = texto;
    listaMensagens.appendChild(mensagemElement);  // APPENDCHILD - adiciona um elemento dentro de outro elemento que você já adicionou
    
    setTimeout(() => {
        mensagemElement.classList.remove("fade-in");
    }, 500);
} */

   buttonSend.addEventListener("click", () => {
    enviarMensagem();
   });
   inputMsg.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        enviarMensagem();
    }
   });

   function renderizarMensagem (tipo, mensagem, horario) {
    const divMensagem = document.createElement("div");
    const direcao = tipo === "enviada" ? "end" : "start";
    const stylesDiv = tipo === "enviada" ? "you" : "other";

    divMensagem.classList.add(
        "flex",
        "flex--direction--row",
        "width--100",
        `justify--content--${direcao}`,
        "fade-in"
    );

    divMensagem.innerHTML = `
                                <div class="flex flex--direction--column message ${stylesDiv}">
                                    <div class="flex--6">
                                    ${mensagem}
                                </div>
                                    <div class="flex--1 flex flex--direction--row justify--content--end align--items--center font--size--12 infos--message">
                                        <div class="emojis-reaction cursor--pointer">&#128517;</div>
                                        <div class="area-emojis"></div>
                                        <img src="./src/assets/icons/heart.svg">
                                        <div>${horario}</div>
                                        <img src="./src/assets/icons/viewed.svg">
                                        </div>
                                </div>
    `;

    return divMensagem;
    
   }

   function carregarMensagemContato(index) {
    const contato = listaDeContatos[index];
    listaMensagens.innerHTML = "";

    contato.conversas.forEach((conversa) => {
        const mensagemRenderizda = renderizarMensagem(
            conversa.tipo, 
            conversa.mensagem, 
            conversa.horario
        );
        listaMensagens.appendChild(mensagemRenderizda);
    });

   }

   function carregarContatos(filtro = "") {
    /**
     * LOOP - laço de repetição
     * WHILE
     * FOR
     * for
     * for of
     * for in
     * forEach
     */

    const divContatosElement = document.querySelector(".div--contacts");
    divContatosElement.innerHTML = "";

    // toLowerCase() -> transforma uma string para minúsculo
    // toUpperCase() -> transforma uma string para maiúsculo

    // filter, find, reduce, map

    const contatosFiltrados = listaDeContatos.filter((contato) => 
        contato.nome.toLowerCase().includes(filtro.toLocaleLowerCase())
    );

    if (contatosFiltrados.length === 0) {
        divContatosElement.innerHTML = "<div><span>Contato não encontrado</span></div>";
        return;
    }

    //const elementoDiv = [];

    contatosFiltrados.forEach((contato, index) => {
        console.log(contato);
        const divParentElement = document.createElement("div");
        divParentElement.classList.add("flex", "area--contact", "fade-in");

        divParentElement.innerHTML = `
                    <div class="flex justify--content--center align--items--center flex--1">
                        <img class="avatar--left--bar" src="${contato.avatar}">
                    </div>
                    <div class="flex flex--direction--column justify--content--center flex--3">
                        <div class="flex align--items--center infos--contact">
                            <div class="font--family font--weight--bold">${contato.nome}</div>
                        </div>
                        <div class="last--message">${contato.ultimaMensagem}</div>
                    </div>
                    <div class="flex flex--direction--column justify--content--center align--items--end flex--1 div--last--messages--info">
                        <div class="hour--last-message">${contato.horarioUltimaMensagem}</div>
                        <div class="flex justify--content--center align--items--center quantity--not--viewed--messages background--green">2</div>
                    </div>
        `;
       // elementoDiv.push(divParentElement);

        divParentElement.addEventListener("click", () => {
            carregarMensagemContato(index);
        });

       divContatosElement.appendChild(divParentElement);
    });
    }

    function notificarNovaMensagem() {
        const somNotificacao = new Audio("./src/assets/audio/standanddeliver.mp3");
        somNotificacao.play();
        let contador = 0;

        const intervalo = setInterval(() => {
            document.title = (contador % 2 === 0) ? `(${contador}) Nova Mensagem` : tituloOriginal;
            contador++; // Mesma coisa que: contador = contador + 1 ou contador +=1

            if (abaFocada) {  
                clearInterval(intervalo);
                document.title = tituloOriginal;
            }

        }, 1000);
    }

    setTimeout(() => {
        carregarContatos();
    }, 2500);

    carregarContatos();

});