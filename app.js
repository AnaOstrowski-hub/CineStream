// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const btnAbrir = document.getElementById('btn-abrir-modal');
    const btnFechar = document.getElementById('btn-fechar-modal');
    const modal = document.getElementById('modal-filme');
    const formFilme = document.getElementById('form-filme');
    
    // Supondo que você tenha um container onde os filmes ficam (ex: uma div ou ul)
    // Altere '#container-filmes' para a classe ou ID real da sua lista de filmes
    const containerFilmes = document.querySelector('#container-filmes') || document.body;

    // Abre a janela para digitar o filme
    btnAbrir.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Fecha a janela
    btnFechar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fecha a janela se clicar fora dela
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Lógica para adicionar o filme na tela
    formFilme.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar

        const titulo = document.getElementById('input-titulo').value;
        const imagemUrl = document.getElementById('input-imagem').value;

        // Cria o elemento do novo filme (ajuste as classes conforme o seu CSS existente)
        const novoFilme = document.createElement('div');
        novoFilme.classList.add('filme-item'); // Mude para o nome da sua classe de filme

        novoFilme.innerHTML = `
            <img src="${imagemUrl || 'https://placeholder.com'}" alt="${titulo}">
            <h3>${titulo}</h3>
        `;

        // Adiciona o novo filme ao seu container existente
        containerFilmes.appendChild(novoFilme);

        // Limpa o formulário e fecha o modal
        formFilme.reset();
        modal.style.display = 'none';
    });
});
