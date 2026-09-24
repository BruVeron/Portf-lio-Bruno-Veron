const SUPABASE_URL = "https://nyiyemrhoircfyxbvbrh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hW1mcUXS1v02FHVCK6Ei9w_3K6ac_nv";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function cadastrar(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("emailCadastro").value.trim();
    const senha = document.getElementById("senhaCadastro").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const mensagem = document.getElementById("mensagemCadastro");

    if (!email || !senha || !confirmarSenha) {
        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não coincidem.";
        mensagem.style.color = "red";
        return;
    }

    mensagem.textContent = "Cadastrando...";
    mensagem.style.color = "blue";

    try {
        const { data, error } = await _supabase.auth.signUp({
            email: email,
            password: senha,
        });

        if (error) {
            mensagem.textContent = error.message || "Erro ao realizar cadastro.";
            mensagem.style.color = "red";
            return;
        }

        mensagem.textContent = "Cadastro realizado! Verifique seu e-mail se necessário ou faça login.";
        mensagem.style.color = "green";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);

    } catch (err) {
        console.error("Erro no cadastro:", err);
        mensagem.textContent = "Ocorreu um erro ao conectar ao servidor.";
        mensagem.style.color = "red";
    }
}

function voltarLogin() {
    window.location.href = "index.html";
}