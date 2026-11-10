
const filmes = [];

const botao = document.getElementById('abrir-formulario');
const formulario = document.getElementById('form-filme');
const feed = document.getElementById('filmes');

// Abrir formulário
botao.addEventListener('click', () => {
    formulario.hidden = !formulario.hidden;
});

// Adicionar filme
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const titulo = formulario.elements.titulo.value.trim();
    const capa = formulario.elements.capa.value.trim();

    if (!titulo || !capa) {
        alert('Preencha todos os campos!');
        return;
    }

    const filme = {
        titulo: titulo,
        capa: capa
    };

    filmes.push(filme);

    // Criar card
    const card = document.createElement('div');
    card.classList.add('filme-card');

    const imagem = document.createElement('img');
    imagem.src = filme.capa;
    imagem.alt = filme.titulo;

    imagem.onerror = () => {
        imagem.alt = 'Não foi possível carregar a capa';
    };

    const info = document.createElement('div');
    info.classList.add('filme-info');

    const nome = document.createElement('h3');
    nome.textContent = filme.titulo;

    const categoria = document.createElement('span');
    categoria.textContent = 'Filme adicionado';

    info.append(nome, categoria);
    card.append(imagem, info);

    // Adicionar ao catálogo
    feed.appendChild(card);

    // Limpar formulário
    formulario.reset();
    formulario.hidden = true;

    alert('Filme adicionado com sucesso!');
});

// Botão assistir
function assistirFilme(nome) {
    alert('Você selecionou: ' + nome);
}
