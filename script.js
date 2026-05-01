let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
const limiteTentativas = 5;

atualizarTentativasRestantes();

function verificarPalpite() {
  let palpite = document.getElementById("palpite").value;
  let mensagem = document.getElementById("mensagem");

  tentativas++;

  atualizarTentativasRestantes();

  if (tentativas >= limiteTentativas) {
    mensagem.innerText = `Game Over! O número secreto era ${numeroSecreto}.`;

    desabilitarjogo();

    setTimeout(reiniciarJogo, 2000);

    return;
  }

  if (palpite == numeroSecreto) {
    mensagem.innerText = `Parabéns! Você acertou o número secreto em ${tentativas} tentativas!`;
    desabilitarjogo();
    setTimeout(reiniciarJogo, 2000);
    return;
  }

  if (palpite < numeroSecreto) {
    mensagem.innerText = "Tente um número maior!";
  } else {
    mensagem.innerText = "Tente um número menor!";
  }
}

function reiniciarJogo() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativas = 0;
  document.getElementById("palpite").value = "";
  document.getElementById("mensagem").innerText = "";
  habilitarjogo();
  atualizarTentativasRestantes();
}

function atualizarTentativasRestantes() {
  const restante = limiteTentativas - tentativas;
  document.getElementById("tentativasrestantes").innerText =
    `Tentativas restantes: ${restante}`;
}

function desabilitarjogo() {
  document.getElementById("palpite").disabled = true;
  document.getElementById("botao").disabled = true;
  document.getElementById("botao").innerText = "Aguarde 2 seundos";
}

function habilitarjogo() {
  document.getElementById("palpite").disabled = false;
  document.getElementById("botao").disabled = false;
  document.getElementById("botao").innerText = "Verificar Palpite";
}
