const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const reiniciarBtn = document.getElementById("reiniciar");

const perguntas = [
    {
        enunciado: "Você foi classificado na Copa do Mundo e agora tens que cobrar um pênalti. Em que lado você vai chutar?",
        alternativas: [
            { texto: "Esquerda", local: "Esquerda" },
            { texto: "Centro", local: "Centro" },
            { texto: "Direita", local: "Direita" }
        ]
    },
    {
        enunciado: "Você terá que marcar outro pênalti! Em que lado você chuta?",
        alternativas: [
            { texto: "Esquerda", local: "Esquerda" },
            { texto: "Centro", local: "Centro" },
            { texto: "Direita", local: "Direita" }
        ]
    },
    {
        enunciado: "Você agora é o goleiro! Qual lado você vai defender?",
        alternativas: [
            { texto: "Esquerda", local: "Esquerda" },
            { texto: "Centro", local: "Centro" },
            { texto: "Direita", local: "Direita" }
        ]
    },
    {
        enunciado: "Última chance como goleiro! Qual lado você vai defender?",
        alternativas: [
            { texto: "Esquerda", local: "Esquerda" },
            { texto: "Centro", local: "Centro" },
            { texto: "Direita", local: "Direita" }
        ]
    },
    {
        enunciado: "Você agora é o zagueiro do Brasil! Qual área você vai bloquear?",
        alternativas: [
            { texto: "Esquerda", local: "Esquerda" },
            { texto: "Centro", local: "Centro" },
            { texto: "Direita", local: "Direita" }
        ]
    },
    {
        enunciado: "O jogo acabou. Clique para ver os resultados.",
        alternativas: [
            { texto: "Ver resultados"}
        ]
    }    
];

const mensagensErro = [
    "Você errou! Quase acertou um torcedor. Que vergonha.",
    "Você acertou na trave! Minha vó joga melhor!",
    "Seu chute falhou. Nem chegou perto do gol!",
    "Acertou o passarinho, mas não o gol.",
    "Mirou no gol inimigo e acertou um gol contra... Como pode?"
];

const mensagensGolBonito = [
    "É a besta enjaulada! Esse é professor do Messi",
    "Golaço do campeão! Ele é imbatível!",
    "Você acertou um gol lindo! Esse vai ficar na história.",
    "Até o Pelé se impressionaria!",
    "Gol incrível! Esse vai pros stories."
];

const mensagensGol = [
    "Gol! Boa jogada!",
    "Você marcou um gol!",
    "Excelente! Gol para você!",
    "Ótimo! Um gol certeiro!",
    "Marcou um gol com precisão!"
];

const mensagensGoleiro = [
    "Ótima defesa! Você conseguiu!",
    "Defesa incrível! Você salvou o gol!",
    "Você foi rápido! A bola não entrou!",
    "Excelente reflexo! Defesa perfeita!",
    "Você defendeu com maestria!"
];

const mensagensZagueiro = [
    "Boa cobertura! Você bloqueou o chute!",
    "Ótimo posicionamento! A bola não passou!",
    "Você defendeu bem, evitando o gol!",
    "Excelente trabalho! O chute foi bloqueado!",
    "Ótima defesa! Você evitou o gol!"
];

const mensagensErroDefesa = [
    "A trave já parou mais gols do que você!",
    "Você piscou e a bola entrou! Tá dormindo?",
    "Tá assistindo o jogo? Até meu sobrinho defende essa!",
    "Essa até o cego viu!",
    "Pior que você só o Gustavo!",
    "O Gasparzinho defende melhor!",
    "Você estava tão fora de posição que o gol virou um alvo móvel.",
    "Essa defesa foi mentirosa, mas só porque mentir é feio."
];

let atual = 0;
let perguntaAtual;
let gols = 0;
let golsBonitos = 0;
let defesas = 0;

function mostraPergunta() {
    if (atual >= perguntas.length) {
        exibeResultadoFinal();
        return;
    }

    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = ""; 

    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => {
            if (atual === 2 || atual === 3) {
                defender(alternativa.local);
            } else if (atual === 4) {
                zagueiro(alternativa.local);
            } else if (atual < 2) {
                chute(alternativa.local);
            } else if (atual === 5) {
                exibeResultadoFinal();
            }
            atual++;
            mostraPergunta();
        });
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function chute(area) {
    let rand = Math.random() * 100;
    let resultado;

    if (rand > 80) {
        resultado = getRandomMessage(mensagensGolBonito);
        textoResultado.className = "texto-resultado acerto";
        golsBonitos++;
        gols++;  
    } else if (rand > 50) {
        resultado = getRandomMessage(mensagensGol);
        textoResultado.className = "texto-resultado acerto";
        gols++;
    } else {
        resultado = getRandomMessage(mensagensErro);
        textoResultado.className = "texto-resultado erro";
    }

    textoResultado.textContent = resultado;
}

function defender(area) {
    let rand = Math.random() * 100;
    let resultado;

    if (rand > 50) {
        resultado = getRandomMessage(mensagensGoleiro);
        textoResultado.className = "texto-resultado acerto";
        defesas++;
    } else {
        resultado = getRandomMessage(mensagensErroDefesa);
        textoResultado.className = "texto-resultado erro";
    }

    textoResultado.textContent = resultado;
}

function zagueiro(area) {
    let rand = Math.random() * 100;
    let resultado;

    if (rand > 50) {
        resultado = getRandomMessage(mensagensZagueiro);
        textoResultado.className = "texto-resultado acerto";
        defesas++; 
    } else {
        resultado = getRandomMessage(mensagensErroDefesa);
        textoResultado.className = "texto-resultado erro";
    }

    textoResultado.textContent = resultado;
}

function getRandomMessage(mensagens) {
    const index = Math.floor(Math.random() * mensagens.length);
    return mensagens[index];
}

function exibeResultadoFinal() {
    caixaPerguntas.textContent = "Resultado Final:";
    caixaAlternativas.innerHTML = ""; 

    let resultadoFinal = "";
    let resultadoClass = "";

    if (gols === 2 && defesas === 3) {
        resultadoFinal = "É a lenda do futebol! Imbatível! Você acertou todas e defendeu todas!";
        resultadoClass = "dourado";
    } else if (gols === 2 && defesas === 2) {
        resultadoFinal = "Eles te chamam de Neymar! Você acertou todas e defendeu 2!";
        resultadoClass = "verde";
    } else if (gols === 2 && defesas === 1) {
        resultadoFinal = "Jogou bem, mas poderia ser melhor. Você acertou 2 e defendeu 1.";
        resultadoClass = "verde";
    } else if (gols === 2 && defesas === 0) {
        resultadoFinal = "Você me lembra de um tal de André. Você acertou 2 e não defendeu nenhuma.";
        resultadoClass = "vermelho";
    } else if (gols === 1 && defesas === 3) {
        resultadoFinal = "Esse é dos bons! Você acertou 1 e defendeu todas.";
        resultadoClass = "verde";
    } else if (gols === 1 && defesas === 2) {
        resultadoFinal = "Nada mal, já pode jogar no Vasco. Você acertou 1 e defendeu 2 vezes.";
        resultadoClass = "verde";
    } else if (gols === 1 && defesas === 1) {
        resultadoFinal = "Já vi criança jogar melhor. Você acertou 1 e defendeu 1 vez.";
        resultadoClass = "vermelho";
    } else if (gols === 1 && defesas === 0) {
        resultadoFinal = "Um cadeirante joga melhor. Você acertou 1 e não defendeu nenhuma.";
        resultadoClass = "vermelho";
    } else if (gols === 0 && defesas === 3) {
        resultadoFinal = "Sorte ou talento? Você não acertou nenhuma, mas defendeu todas.";
        resultadoClass = "verde";
    } else if (gols === 0 && defesas === 2) {
        resultadoFinal = "Já pensou em ser goleiro? Você não marcou nenhuma, mas defendeu 2.";
        resultadoClass = "vermelho";
    } else if (gols === 0 && defesas === 1) {
        resultadoFinal = "Ruim é elogio! Você não fez nenhum gol, e defendeu só 1 vez.";
        resultadoClass = "vermelho";
    } else if (gols === 0 && defesas === 0) {
        resultadoFinal = "Pode aposentar. Futebol não é o jogo pra você. Você não fez um gol nem uma defesa.";
        resultadoClass = "carmesim";
    }

    textoResultado.textContent = resultadoFinal;
    textoResultado.className = `texto-resultado ${resultadoClass}`;

    reiniciarBtn.style.display = "block";

}

function reiniciarJogo() {
    atual = 0;
    gols = 0;
    golsBonitos = 0;
    defesas = 0;
    reiniciarBtn.style.display = "none";
    textoResultado.textContent = ""
    mostraPergunta();
}

reiniciarBtn.addEventListener("click", reiniciarJogo);

mostraPergunta();
