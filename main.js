const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");

const perguntas = [
    {
        enunciado: "Onde você vai chutar?",
        alternativas: [
            { texto: "Área 1", local: "Área 1" },
            { texto: "Área 2", local: "Área 2" }
        ]
    },
    {
        enunciado: "Qual é a sua estratégia de chute?",
        alternativas: [
            { texto: "Chutar forte", local: "Área 1" },
            { texto: "Chutar com precisão", local: "Área 2" }
        ]
    },
    {
        enunciado: "Você se tornou goleiro! Qual área você vai defender?",
        alternativas: [
            { texto: "Área 1", local: "Área 1" },
            { texto: "Área 2", local: "Área 2" }
        ]
    },
    {
        enunciado: "Você é o zagueiro! Qual opção você escolhe para bloquear o chute?",
        alternativas: [
            { texto: "Blocar Área 1", local: "Área 1" },
            { texto: "Blocar Área 2", local: "Área 2" }
        ]
    },
    {
        enunciado: "Última chance como zagueiro! Qual área você vai cobrir?",
        alternativas: [
            { texto: "Área 1", local: "Área 1" },
            { texto: "Área 2", local: "Área 2" }
        ]
    }
];

// Arrays de mensagens
const mensagensErro = [
    "Você errou! Tente novamente.",
    "Não foi dessa vez. Escolha outra opção.",
    "Chute falhou. Melhore sua mira!",
    "Infelizmente, você errou o chute.",
    "Que pena, o chute não foi bem-sucedido."
];

const mensagensGolBonito = [
    "Gol bonito! Que estilo!",
    "Incrível! Um gol muito bonito!",
    "Sensacional! Você fez um gol incrível!",
    "Maravilhoso! Um gol espetacular!",
    "Fantástico! Um gol digno de destaque!"
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
    "Ótima atuação! Você evitou o gol!"
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
    caixaAlternativas.innerHTML = ""; // Limpa as alternativas anteriores

    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => {
            if (atual === 2) {
                defender(alternativa.local);
            } else if (atual >= 3) {
                zagueiro(alternativa.local);
            } else {
                chute(alternativa.local);
            }
        });
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function chute(area) {
    let rand = Math.random() * 100;
    let resultado;

    if (rand > 80) {
        resultado = getRandomMessage(mensagensGolBonito);
        golsBonitos++;
    } else if (rand > 50) {
        resultado = getRandomMessage(mensagensGol);
        gols++;
    } else {
        resultado = getRandomMessage(mensagensErro);
    }

    textoResultado.textContent = resultado;
    setTimeout(() => {
        atual++;
        mostraPergunta();
    }, 2000); // Exibe a mensagem por 2 segundos antes de mostrar a próxima pergunta
}

function defender(area) {
    let rand = Math.random() * 100;
    let resultado;

    if (rand > 50) {
        resultado = getRandomMessage(mensagensGoleiro);
        defesas++;
    } else {
        resultado = `A bola entrou na ${area}.`;
    }

    textoResultado.textContent = resultado;
    setTimeout(() => {
        atual++;
        mostraPergunta();
    }, 2000); // Exibe a mensagem por 2 segundos antes de mostrar a próxima pergunta
}

function zagueiro(area) {
    let rand = Math.random() * 100;
    let resultado;

    if (rand > 50) {
        resultado = getRandomMessage(mensagensZagueiro);
    } else {
        resultado = `O chute passou pela ${area}.`;
    }

    textoResultado.textContent = resultado;
    setTimeout(() => {
        atual++;
        mostraPergunta();
    }, 2000); // Exibe a mensagem por 2 segundos antes de mostrar a próxima pergunta
}

function getRandomMessage(mensagens) {
    const index = Math.floor(Math.random() * mensagens.length);
    return mensagens[index];
}

function exibeResultadoFinal() {
    caixaPerguntas.textContent = "Resultado Final:";
    caixaAlternativas.innerHTML = ""; // Limpa as alternativas anteriores
    textoResultado.textContent = `Gols: ${gols}, Gols Bonitos: ${golsBonitos}, Defesas: ${defesas}`;
}

// Inicializa o jogo
mostraPergunta();
