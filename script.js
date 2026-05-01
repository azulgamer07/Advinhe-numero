// 🎯 SISTEMA DO JOGO
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
const limiteTentativas = 10;
let bloqueado = false;

atualizarTentativasRestantes();

function verificarPalpite() {
  if (bloqueado) return;

  const input = document.getElementById("chute");
  const chute = Number(input.value);
  const msg = document.getElementById("mensagem");
  const card = document.getElementById("card");

  if (!chute) return;

  tentativas++;
  atualizarTentativasRestantes();

  const diferenca = Math.abs(chute - numeroSecreto);

  // 🔥 LIGAR BARRA DE PROXIMIDADE
  atualizarBarra(diferenca);

  // 🎯 ACERTO
  if (chute === numeroSecreto) {
    msg.innerText = `🎉 Parabéns! Você acertou em ${tentativas} tentativas!`;
    msg.className = "win";
    tocarSom("somAcerto");
    soltarConfete();
    finalizarJogo();
    return;
  }

  // 💀 GAME OVER
  if (tentativas >= limiteTentativas) {
    msg.innerText = `💀 Game Over! O número era ${numeroSecreto}`;
    msg.className = "lose";
    tocarSom("somGameOver");
    animarGameOver();
    finalizarJogo();
    return;
  }

  // ❌ ERRO
  card.classList.add("erro");
  setTimeout(() => card.classList.remove("erro"), 400);
  tocarSom("somErro");

  if (diferenca === 1) {
    msg.innerText = "🤯 Tá colado! Quase impossível errar!";
  } else if (diferenca <= 3) {
    msg.innerText = "🔥 Muito, MUITO perto!";
  } else if (diferenca <= 7) {
    msg.innerText = "😮 Bem perto!";
  } else if (diferenca <= 15) {
    msg.innerText = "🙂 Tá chegando...";
  } else if (diferenca <= 30) {
    msg.innerText = "😐 Ainda longe...";
  } else {
    msg.innerText = "🥶 Frio demais!";
  }

  if (Math.random() < 0.5) {
    if (chute > numeroSecreto) {
      msg.innerText += " 📉";
    } else {
      msg.innerText += " 📈";
    }
  }

  input.value = "";
}

function finalizarJogo() {
  bloqueado = true;
  desabilitarJogo();

  setTimeout(() => {
    reiniciar();
  }, 2000);
}

function reiniciar() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativas = 0;
  setTimeout(focoInput, 100);

  document.getElementById("chute").value = "";
  document.getElementById("mensagem").innerText = "";

  // 🔥 RESETAR BARRA
  atualizarBarra(100);

  habilitarJogo();
  atualizarTentativasRestantes();
  bloqueado = false;
}

function atualizarTentativasRestantes() {
  const restante = limiteTentativas - tentativas;
  document.getElementById("tentativasrestantes").innerText =
    `Tentativas restantes: ${restante}`;
}

function desabilitarJogo() {
  document.getElementById("chute").disabled = true;
  document.getElementById("botao").disabled = true;
  document.getElementById("botao").innerText = "Aguarde...";
}

function habilitarJogo() {
  document.getElementById("chute").disabled = false;
  document.getElementById("botao").disabled = false;
  document.getElementById("botao").innerText = "Chutar";
}

// ⌨️ ENTER para jogar
document.getElementById("chute").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    verificarPalpite();
  }
});

// 🔊 TOCAR SOM
function tocarSom(id) {
  const som = document.getElementById(id);
  som.currentTime = 0;
  som.play();
}

//////////////////////////////////////////////////////
// 🔊 SISTEMA DE VOLUME + MUTE
//////////////////////////////////////////////////////

const somAcerto = document.getElementById("somAcerto");
const somErro = document.getElementById("somErro");
const somGameOver = document.getElementById("somGameOver");
const volumeControl = document.getElementById("volume");
const icone = document.getElementById("iconeVolume");

let ultimoVolume = volumeControl.value;

function atualizarVolume() {
  const volume = volumeControl.value;

  somAcerto.volume = volume;
  somErro.volume = volume;
  somGameOver.volume = volume;

  const porcentagem = volume * 100;
  volumeControl.style.background = `linear-gradient(to right, #00ffae ${porcentagem}%, #ccc ${porcentagem}%)`;

  if (volume == 0) {
    icone.textContent = "🔇";
  } else if (volume < 0.5) {
    icone.textContent = "🔉";
  } else {
    icone.textContent = "🔊";
  }
}

volumeControl.addEventListener("input", atualizarVolume);

icone.addEventListener("click", () => {
  icone.classList.add("mute-anim");
  setTimeout(() => icone.classList.remove("mute-anim"), 300);

  if (volumeControl.value > 0) {
    ultimoVolume = volumeControl.value;
    volumeControl.value = 0;
  } else {
    volumeControl.value = ultimoVolume || 0.5;
  }

  icone.style.opacity = 0;
  setTimeout(() => {
    atualizarVolume();
    icone.style.opacity = 1;
  }, 100);
});

atualizarVolume();

//////////////////////////////////////////////////////
// 🎆 CONFETE
//////////////////////////////////////////////////////

function soltarConfete() {
  let rodadas = 0;

  const intervalo = setInterval(() => {
    for (let i = 0; i < 35; i++) {
      const confete = document.createElement("div");
      confete.classList.add("confete");

      confete.style.left = Math.random() * 100 + "vw";
      confete.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

      const tamanho = Math.random() * 6 + 4;
      confete.style.width = tamanho + "px";
      confete.style.height = tamanho + "px";

      const duracao = Math.random() * 1.5 + 1.5;
      confete.style.animationDuration = duracao + "s";

      document.body.appendChild(confete);

      setTimeout(() => confete.remove(), duracao * 1000);
    }

    rodadas++;
    if (rodadas >= 6) clearInterval(intervalo);
  }, 200);
}

//////////////////////////////////////////////////////
// 💀 GAME OVER SHAKE
//////////////////////////////////////////////////////

function animarGameOver() {
  const card = document.getElementById("card");
  card.classList.add("gameover-screen");
  setTimeout(() => card.classList.remove("gameover-screen"), 500);
}

//////////////////////////////////////////////////////
// 🎮 UX
//////////////////////////////////////////////////////

const input = document.getElementById("chute");
const botao = document.getElementById("botao");

input.focus();

input.addEventListener("input", () => {
  botao.disabled = input.value === "";
});

function focoInput() {
  input.focus();
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    verificarPalpite();
    setTimeout(() => input.focus(), 50);
  }
});

//////////////////////////////////////////////////////
// 📊 BARRA DE PROXIMIDADE
//////////////////////////////////////////////////////

function atualizarBarra(diferenca) {
  const barra = document.getElementById("barraProximidade");

  const max = 100;
  let proximidade = 100 - diferenca;
  let porcentagem = (proximidade / max) * 100;

  barra.style.width = porcentagem + "%";

  if (porcentagem > 70) {
    barra.style.background = "#22c55e";
  } else if (porcentagem > 40) {
    barra.style.background = "#facc15";
  } else {
    barra.style.background = "#ef4444";
  }
}