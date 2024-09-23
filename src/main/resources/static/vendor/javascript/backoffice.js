document.addEventListener("DOMContentLoaded", function () {
    let paginaAtual = 0;
    let totalPaginas = 0;

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

    async function carregarProdutos(pagina = 0) {
        try {
            const response = await fetch(`/api/produtos?page=${pagina}&size=10`);
            const data = await response.json();
            totalPaginas = data.totalPages;
            preencherTabelaProdutos(data.content);
            atualizarPaginacao();
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
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
            row.insertCell(3).innerText = usuario.grupo;
            row.insertCell(4).innerHTML = `
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="statusSwitch${usuario.id}" ${usuario.ativo ? 'checked' : ''}>
                    <label class="form-check-label" for="statusSwitch${usuario.id}">${usuario.ativo ? 'Ativo' : 'Inativo'}</label>
                </div>
            `;
            row.insertCell(5).innerHTML = `
                <button class="btn btn-outline-light">Editar</button>
            `;

            // Adiciona evento de clique ao switch
            const switchElement = row.querySelector(`#statusSwitch${usuario.id}`);
            switchElement.addEventListener('change', function () {
                atualizarStatusUsuario(usuario.id, switchElement.checked);
            });
        });
    }

    async function atualizarStatusUsuario(id, status) {
        try {
            const response = await fetch(`http://localhost:8080/api/usuarios/${id}/status?ativo=${status}`, {
                method: 'PATCH'
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar status do usuário');
            }
            carregarUsuarios(); // Recarrega a tabela de usuários
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    function preencherTabelaProdutos(produtos) {
        const tabelaProdutos = document.getElementById('tabelaProdutos').getElementsByTagName('tbody')[0];
        tabelaProdutos.innerHTML = '';
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

    function atualizarPaginacao() {
        const paginacaoContainer = document.querySelector('.btn-toolbar .btn-group');
        paginacaoContainer.innerHTML = '';
        for (let i = 0; i < totalPaginas; i++) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'btn btn-outline-secondary';
            button.textContent = i + 1;
            button.addEventListener('click', function() {
                paginaAtual = i;
                carregarProdutos(paginaAtual);
            });
            paginacaoContainer.appendChild(button);
        }
    }

    function showUsuarios() {
        document.getElementById('tabelaUsuarios').classList.remove('d-none');
        document.getElementById('tabelaProdutos').classList.add('d-none');
        document.getElementById('tituloTabela').innerText = 'Usuários';
        document.getElementById('botaoNovo').innerText = '+ Novo Usuário';
        document.getElementById('paginas123').classList.add('d-none');

        carregarUsuarios();
    }

    function showProdutos() {
        document.getElementById('tabelaUsuarios').classList.add('d-none');
        document.getElementById('tabelaProdutos').classList.remove('d-none');
        document.getElementById('tituloTabela').innerText = 'Produtos';
        document.getElementById('botaoNovo').innerText = '+ Novo Produto';
        document.getElementById('paginas123').classList.remove('d-none');
        carregarProdutos();
    }

    window.showUsuarios = showUsuarios;
    window.showProdutos = showProdutos;

    // Carregar usuários automaticamente ao carregar a página
    carregarUsuarios();

    // validação
    (function () {
        const scriptName = document.currentScript.src.split('/').pop();
        console.log(`${scriptName} carregado com sucesso`);
    })();
});

// modal para cadastrar novo usuario
document.addEventListener("DOMContentLoaded", function () {
    function validarEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11) return false;
        if (/^(\d)\1+$/.test(cpf)) return false;
        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = 11 - (soma % 11);
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf.charAt(10));
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
            if (!response.ok) {
                throw new Error('Erro ao cadastrar usuário');
            }
            alert('Usuário cadastrado com sucesso!');
            location.reload();
        } catch (error) {
            console.error('Erro:', error);
            exibirErro('Erro ao cadastrar usuário');
        }
    }

    document.getElementById("salvarUsuario").addEventListener("click", async function () {
        const nome = document.getElementById("nomeUsuario").value;
        const cpf = document.getElementById("cpfUsuario").value;
        const email = document.getElementById("emailUsuario").value;
        const grupo = document.getElementById("grupoUsuario").value;
        const senha = document.getElementById("senhaUsuario").value;
        const confirmarSenha = document.getElementById("confirmarSenhaUsuario").value;

        if (!nome || !cpf || !email || !grupo || !senha || !confirmarSenha) {
            exibirErro("Todos os campos são obrigatórios.");
            return;
        }

        if (!validarEmail(email)) {
            exibirErro("Email inválido.");
            return;
        }

        if (!validarCPF(cpf)) {
            exibirErro("CPF inválido.");
            return;
        }

        if (senha !== confirmarSenha) {
            exibirErro("As senhas não coincidem.");
            return;
        }

        const senhaCriptografada = btoa(senha); // Simulação de criptografia, substitua por uma real

        const dados = {
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senhaCriptografada,
            grupo: grupo,
            ativo: true
        };

        await registrarUsuario(dados);
    });
});