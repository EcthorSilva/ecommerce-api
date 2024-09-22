document.addEventListener("DOMContentLoaded", function () {
    async function carregarUsuarios() {
        try {
            const response = await fetch('http://localhost:8080/api/usuarios');
            if (!response.ok) {
                throw new Error('Erro ao buscar usuários');
            }
            const usuarios = await response.json();
            preencherTabelaUsuarios(usuarios);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    async function carregarProdutos() {
        try {
            const response = await fetch('http://localhost:8080/api/produtos?page=0&size=10');
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos');
            }
            const produtos = await response.json();
            preencherTabelaProdutos(produtos.content);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    function preencherTabelaUsuarios(usuarios) {
        const tabelaUsuarios = document.getElementById('tabelaUsuarios').getElementsByTagName('tbody')[0];
        tabelaUsuarios.innerHTML = ''; // Limpa a tabela antes de preencher

        usuarios.forEach(usuario => {
            const row = tabelaUsuarios.insertRow();
            row.insertCell(0).innerText = usuario.id;
            row.insertCell(1).innerText = usuario.nome;
            row.insertCell(2).innerText = usuario.email;
            row.insertCell(3).innerText = usuario.ativo ? 'Ativo' : 'Inativo';
            row.insertCell(4).innerText = usuario.grupo;
            row.insertCell(5).innerHTML = `
                <button class="btn btn-outline-light">Alterar</button>
                <button class="btn btn-outline-light">Visualizar</button>
            `;
        });
    }

    function preencherTabelaProdutos(produtos) {
        const tabelaProdutos = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];
        tabelaProdutos.innerHTML = ''; // Limpa a tabela antes de preencher

        produtos.forEach(produto => {
            const row = tabelaProdutos.insertRow();
            row.insertCell(0).innerText = produto.id;
            row.insertCell(1).innerText = produto.nome;
            row.insertCell(2).innerText = produto.quantidadeEmEstoque;
            row.insertCell(3).innerText = produto.preco;
            row.insertCell(4).innerText = produto.ativo ? 'Ativo' : 'Inativo';
            row.insertCell(5).innerHTML = `
                <button class="btn btn-outline-light">Alterar</button>
                <button class="btn btn-outline-light">Visualizar</button>
            `;
        });
    }

    function showUsuarios() {
        document.getElementById('tabelaUsuarios').classList.remove('d-none');
        document.getElementById('tabelaProdutos').classList.add('d-none');
        document.getElementById('tituloTabela').innerText = 'Usuários';
        document.getElementById('botaoNovo').innerText = '+ Novo Usuário';
        carregarUsuarios();
    }

    function showProdutos() {
        document.getElementById('tabelaUsuarios').classList.add('d-none');
        document.getElementById('tabelaProdutos').classList.remove('d-none');
        document.getElementById('tituloTabela').innerText = 'Produtos';
        document.getElementById('botaoNovo').innerText = '+ Novo Produto';
        carregarProdutos();
    }

    window.showUsuarios = showUsuarios;
    window.showProdutos = showProdutos;

    // Carregar usuários automaticamente ao carregar a página
    carregarUsuarios();
});