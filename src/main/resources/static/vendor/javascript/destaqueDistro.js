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
        default:
            return '';
    }
}

// Função para criar e adicionar os cards ao HTML
function adicionarCards(produtos, containerId) {
    const container = document.getElementById(containerId);

    // Limpa o container antes de adicionar novos cards
    container.innerHTML = '';

    produtos.forEach(produto => {
        const cardCol = document.createElement('div');
        cardCol.className = 'col-lg-3 col-md-6 mb-4 mb-lg-0';

        cardCol.innerHTML = `
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

        container.appendChild(cardCol);
    });
}

// Função para fazer a requisição ao endpoint
async function carregarProdutos(distribuidor, containerId, distribuidorId) {
    try {
        const response = await fetch(`http://localhost:8080/api/produtos/distribuidor/${distribuidor}`);
        const data = await response.json();
        
        // Verificar se 'content' é um array
        if (Array.isArray(data.content)) {
            adicionarCards(data.content, containerId);
        } else {
            console.error('A resposta não contém um array de produtos.');
        }

        // Atualizar o nome do distribuidor no elemento <h2>
        const distribuidorElement = document.getElementById(distribuidorId);
        if (distribuidorElement) {
            distribuidorElement.textContent = distribuidor;
        } else {
            console.error(`Elemento do distribuidor "${distribuidor}" não encontrado.`);
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Chamar as funções para carregar os produtos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos('Warner Bros. Games', 'product-cards-1', 'distribuidor-1');
    carregarProdutos('Devolver', 'product-cards-2', 'distribuidor-2');
    carregarProdutos('Outra Distribuidora', 'product-cards-3', 'distribuidor-3');
});

// validação
(function() {
    const scriptName = document.currentScript.src.split('/').pop();
    console.log(`${scriptName} carregado com sucesso`);
})();