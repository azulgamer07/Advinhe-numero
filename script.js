let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
const limiteTentativas = 5;

function verificarPalpite() {
    let palpite = document.getElementById("palpite").value;
    let mensagem = document.getElementById("mensagem");

    tentativas++;

    if (tentativas >= limiteTentativas) {
        mensagem.innerText = `Game Over! O número secreto era ${numeroSecreto}.`;
        
        setTimeout(reiniciarJogo, 2000);

        return;
    }


    if (palpite == numeroSecreto) {
            mensagem.innerText = `Parabéns! Você acertou o número secreto em ${tentativas} tentativas!`;
            setTimeout(reiniciarJogo, 2000);
        }
        else if (palpite < numeroSecreto) {
            mensagem.innerText = "Tente um número maior!";
        }
        else {
            mensagem.innerText = "Tente um número menor!";
        }
}

function reiniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0;
    document.getElementById("palpite").value = "";
    document.getElementById("mensagem").innerText = "";
}

    