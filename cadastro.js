function cadastrar() {

    var email = document.getElementById("emailCadastro").value.trim();
    var senha = document.getElementById("senhaCadastro").value;
    var confirmarSenha = document.getElementById("confirmarSenha").value;
    var mensagem = document.getElementById("mensagemCadastro");


    // Verifica se os campos estão preenchidos

    if (!email || !senha || !confirmarSenha) {

        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";

        return;
    }


    // Verifica se o e-mail possui @

    if (!email.includes("@")) {

        mensagem.textContent = "Digite um e-mail válido.";
        mensagem.style.color = "red";

        return;
    }


    // Verifica se as senhas são iguais

    if (senha !== confirmarSenha) {

        mensagem.textContent = "As senhas não são iguais.";
        mensagem.style.color = "red";

        return;
    }


    // Envia os dados para o servidor

    fetch("http://localhost:3000/api/cadastro", {

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

        return response.json();

    })


    .then(data => {

        if (data.success) {

            mensagem.textContent = data.message;
            mensagem.style.color = "green";


            // Depois de cadastrar,
            // volta para o login

            setTimeout(() => {

                window.location.href = "index.html";

            }, 1500);


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



function voltarLogin() {

    window.location.href = "index.html";

}