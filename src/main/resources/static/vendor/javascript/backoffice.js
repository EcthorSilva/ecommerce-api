function showUsuarios() {
    document.getElementById('tabelaProdutos').classList.add('d-none');
    document.getElementById('tabelaUsuarios').classList.remove('d-none');
    document.getElementById('tituloTabela').innerText = 'Usuários';
    document.getElementById('botaoNovo').innerText = '+ Novo Usuário';
}

function showProdutos() {
    document.getElementById('tabelaUsuarios').classList.add('d-none');
    document.getElementById('tabelaProdutos').classList.remove('d-none');
    document.getElementById('tituloTabela').innerText = 'Produtos';
    document.getElementById('botaoNovo').innerText = '+ Novo Produto';
}

function abrirModal() {
    const tituloTabela = document.getElementById('tituloTabela').innerText;

    if (tituloTabela === 'Usuários') {
        const modalUsuario = new bootstrap.Modal(document.getElementById('modalUsuario'));
        modalUsuario.show();
    } else if (tituloTabela === 'Produtos') {
        const modalProduto = new bootstrap.Modal(document.getElementById('modalProduto'));
        modalProduto.show();
    }
}