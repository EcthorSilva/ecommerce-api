document.addEventListener("DOMContentLoaded", function () {
    function validarEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para exibir mensagens de erro
    function exibirErro(mensagem) {
        var errorDiv = document.querySelector('.alert-danger');
        errorDiv.textContent = mensagem;
        errorDiv.classList.remove('visually-hidden');

        setTimeout(function () {
            errorDiv.classList.add('visually-hidden');
        }, 3000);
    }

    // Função para verificar o login
    document.getElementById("loginButton").addEventListener("click", function () {
        var email = document.getElementById("email").value;
        var password = document.getElementById("senha").value;
        var errorDiv = document.querySelector('.alert-danger');

        // Limpa a mensagem de erro ao tentar fazer login novamente
        errorDiv.classList.add('visually-hidden');

        // Verifica se os campos de e-mail e senha estão preenchidos
        if (email.trim() === "" || password.trim() === "") {
            exibirErro("Por favor, preencha todos os campos.");
            return;
        }

        // Verifica se o e-mail é válido
        if (!validarEmail(email)) {
            exibirErro("Por favor, insira um e-mail válido.");
            return;
        }

        // Envia a requisição de login
        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Usuário ou Senha incorreto");
            }
            return response.json();
        })
        .then(data => {
            // Redireciona para a página do backoffice
            window.location.href = "/backoffice";
        })
        .catch(error => {
            exibirErro(error.message);
        });
    });
});

// validação
(function() {
    const scriptName = document.currentScript.src.split('/').pop();
    console.log(`${scriptName} carregado com sucesso`);
})();