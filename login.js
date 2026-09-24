// Configuração do cliente Supabase
const SUPABASE_URL = "https://nyiyemrhoircfyxbvbrh.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hW1mcUXS1v02FHVCK6Ei9w_3K6ac_nv";

const _supabase = _supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function logar(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("login").value.trim();
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (!email || !senha) {
        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    mensagem.textContent = "Autenticando...";
    mensagem.style.color = "blue";

    try {
        // Autenticação direta com o Supabase Auth
        const { data, error } = await _supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            mensagem.textContent = error.message || "Erro ao realizar login.";
            mensagem.style.color = "red";
            return;
        }

        if (data.user) {
            mensagem.textContent = "Login realizado com sucesso!";
            mensagem.style.color = "green";

            setTimeout(() => {
                window.location.href = "Abertura.html";
            }, 1000);
        }
    } catch (err) {
        console.error("Erro inesperado:", err);
        mensagem.textContent = "Ocorreu um erro ao conectar ao servidor.";
        mensagem.style.color = "red";
    }
}

function cancelar() {
    document.getElementById("login").value = "";
    document.getElementById("senha").value = "";
    const mensagem = document.getElementById("mensagem");
    if (mensagem) mensagem.textContent = "";
}