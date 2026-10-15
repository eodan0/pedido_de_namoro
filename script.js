const senhaForm = document.querySelector("#form-senha");
const senhaInput = document.querySelector("#senha");
const erro = document.querySelector("#erro");

function mostrarTela(id) {
  document.querySelectorAll(".screen").forEach(tela => {
    tela.classList.add("hidden");
    tela.classList.remove("active");
  });
  const escolhida = document.getElementById(id);
  escolhida.classList.remove("hidden");
  escolhida.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

senhaInput.addEventListener("input", () => {
  let numeros = senhaInput.value.replace(/\D/g, "").slice(0, 4);
  if (numeros.length > 2) numeros = numeros.slice(0, 2) + "/" + numeros.slice(2);
  senhaInput.value = numeros;
});

senhaForm.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const resposta = senhaInput.value.trim();
  if (resposta === "05/06" || resposta === "0506") {
    erro.textContent = "";
    mostrarTela("tela-carta");
  } else {
    erro.textContent = "Hmm… tenta lembrar da nossa data secreta. 💗";
    senhaInput.focus();
  }
});

document.querySelector("#ir-pedido").addEventListener("click", () => {
  mostrarTela("tela-pedido");
});

document.querySelector("#sim").addEventListener("click", () => {
  mostrarTela("tela-final");
  soltarCoracoes();
});

document.querySelector("#ainda-nao").addEventListener("click", () => {
  document.querySelector("#resposta").textContent =
    "Tudo bem, meu bem. ❤️ O que importa é você se sentir à vontade para responder com sinceridade.";
});

function soltarCoracoes() {
  for (let i = 0; i < 22; i++) {
    const coracao = document.createElement("span");
    coracao.textContent = Math.random() > 0.5 ? "♥" : "♡";
    Object.assign(coracao.style, {
      position: "fixed",
      left: Math.random() * 100 + "vw",
      top: "-30px",
      zIndex: "10",
      color: ["#ff79bd", "#ffd0e8", "#ffffff"][Math.floor(Math.random() * 3)],
      fontSize: (16 + Math.random() * 22) + "px",
      transition: "transform 3s linear, opacity 3s linear",
      pointerEvents: "none"
    });
    document.body.appendChild(coracao);
    requestAnimationFrame(() => {
      coracao.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${Math.random() * 500}deg)`;
      coracao.style.opacity = "0";
    });
    setTimeout(() => coracao.remove(), 3200);
  }
}
