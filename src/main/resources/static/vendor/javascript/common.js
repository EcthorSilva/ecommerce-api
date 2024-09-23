document.addEventListener("DOMContentLoaded", function () {
    async function verificarLogin() {
        try {
            const response = await fetch('http://localhost:8080/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const loggedInElement = document.querySelector('.logged-in');
            const loggedOutElement = document.querySelector('.logged-out');

            if (response.ok) {
                const data = await response.json();
                console.log('Usuário logado:', data);

                // Mostra o menu de usuário logado
                loggedInElement.classList.remove('visually-hidden');
                loggedOutElement.classList.add('visually-hidden');
            } else {
                console.log('Usuário não está logado');

                // Mostra o menu de usuário deslogado
                loggedInElement.classList.add('visually-hidden');
                loggedOutElement.classList.remove('visually-hidden');
            }
        } catch (error) {
            console.error('Erro ao verificar login:', error);

            // Mostra o menu de usuário deslogado em caso de erro
            document.querySelector('.logged-in').classList.add('visually-hidden');
            document.querySelector('.logged-out').classList.remove('visually-hidden');
        }
    }

    // Chama a função para verificar o login quando a página carregar
    verificarLogin();

    // Função para fazer logout
    async function logout() {
        try {
            const response = await fetch('http://localhost:8080/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                console.log('Logout bem-sucedido');
                window.location.href = '/';
            } else {
                console.error('Erro ao fazer logout');
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    // Adiciona o evento de clique ao botão de logout
    document.querySelector('.logout-button').addEventListener('click', function (event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        logout();
    });
});

// validação
(function() {
    const scriptName = document.currentScript.src.split('/').pop();
    console.log(`${scriptName} carregado com sucesso`);
})();