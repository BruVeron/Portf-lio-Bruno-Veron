const botao = document.getElementById("meuBotao");

botao.addEventListener("click", () => {
  botao.style.transform = "scale(1.2)";
  botao.style.backgroundColor = "#9D00FF";

  setTimeout(() => {
    botao.style.transform = "scale(3)";
    botao.style.backgroundColor = "";
  }, 200);
});
botao.addEventListener("mouseover", () => {
  botao.style.transform = "rotate(-5deg) scale(1.1)";
});

botao.addEventListener("mouseout", () => {
  botao.style.transform = "rotate(0) scale(1)";
});


  document.getElementById('ano').textContent = new Date().getFullYear();