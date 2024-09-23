document.addEventListener("DOMContentLoaded", function () {
    async function carregarPerfil() {
        try {
            const response = await fetch('http://localhost:8080/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // Inclui cookies na requisição
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar perfil');
            }

            const data = await response.json();

            console.log(data);

            // Atualiza os elementos HTML com os dados do usuário
            document.querySelector('.userNome').textContent = data.nome;
            document.querySelector('.userEmail').textContent = data.email;
            document.querySelector('.userGrup').textContent = data.grupo;

        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // Chama a função para carregar o perfil quando a página carregar
    carregarPerfil();
});

// validação
(function() {
    const scriptName = document.currentScript.src.split('/').pop();
    console.log(`${scriptName} carregado com sucesso`);
})();