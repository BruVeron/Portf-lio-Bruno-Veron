function logar() {
var email = document.getElementById("login").value.trim();
var senha = document.getElementById("senha").value;
var mensagem = document.getElementById("mensagem");

if (!email || !senha) {

    mensagem.textContent = "Preencha todos os campos.";
    mensagem.style.color = "red";

    return;
}

if (!email.includes("@")) {

    mensagem.textContent = "Digite um e-mail válido.";
    mensagem.style.color = "red";

    return;
}
fetch("https://portifolio-bruno-veron.onrender.com/api/login", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        email: email,
        senha: senha
    })

})

.then(response => {

    console.log("Status:", response.status);

    if (!response.ok) {
        return response.json().then(data => {
            throw new Error(data.message);
        });
    }

    return response.json();
})

.then(data => {

    if (data.success) {

        mensagem.textContent = data.message;
        mensagem.style.color = "green";

        setTimeout(() => {
            window.location.href = "Abertura.html";
        }, 1000);

    } else {

        mensagem.textContent = data.message;
        mensagem.style.color = "red";

    }

})

.catch(error => {

    console.error("Erro:", error);

    mensagem.textContent =
        "Não foi possível conectar ao servidor.";

    mensagem.style.color = "red";

});

}