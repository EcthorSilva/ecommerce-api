document.addEventListener("DOMContentLoaded", function () {
    function validarEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function exibirErro(mensagem) {
        var errorDiv = document.querySelector('.alert-danger');
        errorDiv.querySelector('strong').textContent = mensagem;
        errorDiv.classList.remove('visually-hidden');

        setTimeout(function () {
            errorDiv.classList.add('visually-hidden');
        }, 3000);
    }

    async function registrarUsuario(dados) {
        try {
            const response = await fetch('http://localhost:8080/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                window.location.href = '/login';
            } else {
                const errorData = await response.text();
                exibirErro(errorData);
            }
        } catch (error) {
            exibirErro('Erro ao registrar usuário');
        }
    }

    document.getElementById("signupButton").addEventListener("click", function () {
        var nome = document.getElementById("nome").value;
        var cpf = document.getElementById("cpf").value;
        var email = document.getElementById("email").value;
        var senha = document.getElementById("senha").value;
        var confirmarSenha = document.getElementById("confirmarSenha").value;
        var termos = document.getElementById("termos").checked;

        if (!validarEmail(email)) {
            exibirErro('Email inválido');
            return;
        }

        if (senha !== confirmarSenha) {
            exibirErro('As senhas não coincidem');
            return;
        }

        if (!termos) {
            exibirErro('Você deve aceitar os termos e condições');
            return;
        }

        var dados = {
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senha,
            grupo: 'ESTOQUISTA',
            ativo: true
        };

        registrarUsuario(dados);
    });
});

// validação
(function() {
    const scriptName = document.currentScript.src.split('/').pop();
    console.log(`${scriptName} carregado com sucesso`);
})();