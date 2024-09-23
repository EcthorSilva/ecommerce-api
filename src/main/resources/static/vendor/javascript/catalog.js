/*
* TO DO: 
* 
* 1- Colocar um filtro para organizar os produtos por preço (mais barato, mais caro e vice-versa);
* 2- Colocar um filtro para a plataforma, ao selecionar a plataforma, os produtos devem ser filtrados;
*
*/ 


let produtosGlobal = [];
let paginaAtual = 0;
let totalPaginas = 0;

// Função para calcular o desconto
function calcularDesconto(preco, precoComDesconto) {
    return Math.round(((preco - precoComDesconto) / preco) * 100);
}

// Função para obter o ícone da categoria
function getCategoriaIcon(categoria) {
    switch (categoria) {
        case 'WINDOWS':
            return '<i class="bi bi-windows text-muted"></i>';
        case 'STEAM':
            return '<i class="bi bi-steam text-muted"></i>';
        case 'PLAYSTATION':
            return '<i class="bi bi-playstation text-muted"></i>';
        case 'XBOX':
            return '<i class="bi bi-xbox text-muted"></i>';
        case 'OUTROS':
            return '<i class="bi bi-nintendo-switch text-muted"></i>';
        default:
            return '';
    }
}

// Função para criar e adicionar os cards ao HTML
function adicionarCards(produtos, containerId) {
    const container = document.getElementById(containerId);

    // Limpa o container antes de adicionar novos cards
    container.innerHTML = '';

    let row;
    produtos.forEach((produto, index) => {
        if (index % 3 === 0) {
            row = document.createElement('div');
            row.className = 'row py-2';
            container.appendChild(row);
        }

        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4 mb-lg-0';

        col.innerHTML = `
            <div class="card">
                <img src="${produto.imgUrl}" alt="Imagem do Produto" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    ${getCategoriaIcon(produto.categoria)}&nbsp;
                    <div class="position-absolute bottom-0 end-0 p-2">
                        ${produto.temDesconto ? `
                            <h6 class="text-reset bg-dark bg-opacity-75 p-2 rounded" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
                                R$${produto.precoComDesconto.toFixed(2)} <span class="badge text-bg-danger">-${calcularDesconto(produto.preco, produto.precoComDesconto)}%</span>
                            </h6>` : 
                            `<h6 class="text-reset bg-dark bg-opacity-75 p-2 rounded" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">R$${produto.preco.toFixed(2)}</h6>`
                        }
                    </div>
                    <br>
                    <button type="button" class="btn btn-outline-secondary mt-3 ps-3 pe-3">
                        <i class="bi bi-cart-plus"> adicionar</i>
                    </button>
                </div>
            </div>
        `;

        row.appendChild(col);
    });
}

// Função para fazer a requisição ao endpoint
async function carregarProdutosCatalogo(containerId, nome = '', pagina = 0) {
    try {
        const url = nome ? `http://localhost:8080/api/produtos/search?nome=${nome}` : `http://localhost:8080/api/produtos?page=${pagina}&size=9`;
        console.log(`Fetching URL: ${url}`); // Log para depuração
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('Resposta da API:', data); // Log para depuração

        const alertaPesquisa = document.getElementById('alertaPesquisa');
        const itensContainer = document.getElementById('itensContainer');
        const itensDePesquisa = document.getElementById('itensDePesquisa');

        // Limpa os contêineres de itens antes de adicionar novos itens
        itensContainer.innerHTML = '';
        itensDePesquisa.innerHTML = '';

        // Verificar se a resposta é um array
        if (Array.isArray(data)) {
            console.log(`Produtos carregados: ${data.length}`); // Log para depuração
            if (data.length === 0) {
                alertaPesquisa?.classList.remove('visually-hidden');
                itensContainer?.classList.add('visually-hidden');
                itensDePesquisa?.classList.add('visually-hidden');
            } else {
                alertaPesquisa?.classList.add('visually-hidden');
                produtosGlobal = data; // Armazena os produtos na variável global
                adicionarCards(data, containerId);
            }
        } else if (Array.isArray(data.content)) {
            console.log(`Produtos carregados: ${data.content.length}`); // Log para depuração
            if (data.content.length === 0) {
                alertaPesquisa?.classList.remove('visually-hidden');
                itensContainer?.classList.add('visually-hidden');
                itensDePesquisa?.classList.add('visually-hidden');
            } else {
                alertaPesquisa?.classList.add('visually-hidden');
                produtosGlobal = data.content; // Armazena os produtos na variável global
                totalPaginas = data.totalPages; // Armazena o número total de páginas
                adicionarCards(data.content, containerId);
                atualizarPaginacao();
            }
        } else {
            console.error('A resposta não contém um array de produtos.');
            alertaPesquisa?.classList.remove('visually-hidden');
            itensContainer?.classList.add('visually-hidden');
            itensDePesquisa?.classList.add('visually-hidden');
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        document.getElementById('alertaPesquisa')?.classList.remove('visually-hidden');
        document.getElementById('itensContainer')?.classList.add('visually-hidden');
        document.getElementById('itensDePesquisa')?.classList.add('visually-hidden');
    }
}

// Função para ordenar os produtos
function ordenarProdutos(ordenacao) {
    let produtosOrdenados = [...produtosGlobal];
    if (ordenacao === '1') {
        produtosOrdenados.sort((a, b) => a.preco - b.preco);
    } else if (ordenacao === '2') {
        produtosOrdenados.sort((a, b) => b.preco - a.preco);
    }
    adicionarCards(produtosOrdenados, 'itensContainer');
}

// Função para atualizar os botões de paginação
function atualizarPaginacao() {
    const paginacaoContainer = document.querySelector('.btn-toolbar .btn-group');
    paginacaoContainer.innerHTML = ''; // Limpa os botões de paginação

    for (let i = 0; i < totalPaginas; i++) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-secondary';
        button.textContent = i + 1;
        button.addEventListener('click', function() {
            paginaAtual = i;
            carregarProdutosCatalogo('itensContainer', '', paginaAtual);
        });
        paginacaoContainer.appendChild(button);
    }
}

// Chamar a função para carregar os produtos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarProdutosCatalogo('itensContainer', '', paginaAtual);

    // Adicionar evento de escuta à barra de pesquisa
    const searchBar = document.getElementById('searchBar');
    searchBar?.addEventListener('input', function() {
        const searchTerm = searchBar.value;
        const itensContainer = document.getElementById('itensContainer');
        const itensDePesquisa = document.getElementById('itensDePesquisa');
        if (searchTerm) {
            console.log(`Pesquisando por: ${searchTerm}`); // Log para depuração
            itensContainer?.classList.add('visually-hidden');
            itensDePesquisa?.classList.remove('visually-hidden');
            carregarProdutosCatalogo('itensDePesquisa', searchTerm);
        } else {
            itensContainer?.classList.remove('visually-hidden');
            itensDePesquisa?.classList.add('visually-hidden');
            carregarProdutosCatalogo('itensContainer', '', paginaAtual); // Recarregar todos os produtos
        }
    });

    // Adicionar evento de escuta ao botão de ordenação
    document.querySelector('.btn-outline-secondary').addEventListener('click', function() {
        const ordenacao = document.getElementById('inputGroupSelect04').value;
        ordenarProdutos(ordenacao);
    });
});

// validação
(function() {
    const scriptName = document.currentScript.src.split('/').pop();
    console.log(`${scriptName} carregado com sucesso`);
})();