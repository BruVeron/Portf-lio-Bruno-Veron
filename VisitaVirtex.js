const imagens = document.getElementById("imagens");

const modal = document.getElementById("modal");

const imagemGrande = document.getElementById("imagemGrande");


/* AVANÇAR */

function avancar() {

    imagens.scrollBy({
        left: 250,
        behavior: "smooth"
    });

}


/* VOLTAR */

function voltar() {

    imagens.scrollBy({
        left: -250,
        behavior: "smooth"
    });

}


/* ABRIR IMAGEM GRANDE */

function abrirImagem(imagem) {

    imagemGrande.src = imagem.src;

    modal.classList.add("aberto");

}


/* FECHAR IMAGEM */

function fecharImagem() {

    modal.classList.remove("aberto");

}