
// ABRIR FORMULÁRIO
function abrirFormulario() {
    document.getElementById("formulario").style.display = "block";

    document.getElementById("formulario").scrollIntoView({
        behavior: "smooth"
    });
}

// FECHAR FORMULÁRIO
function fecharFormulario() {
    document.getElementById("formulario").style.display = "none";
}

// ADICIONAR FILME OU SÉRIE
function adicionarFilme() {

    const nome = document.getElementById("nome").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const nota = document.getElementById("nota").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const tipo = document.getElementById("tipo").value;

    if (!nome || !genero || !nota || !imagem) {
        alert("Preencha todos os campos!");
        return;
    }

    const notaNumero = Number(nota);

    if (!Number.isFinite(notaNumero) ||
        notaNumero < 0 || notaNumero > 10) {
        alert("Digite uma nota entre 0 e 10!");
        return;
    }

    // Verificar se a imagem é um endereço válido
    try {
        const url = new URL(imagem);

        if (url.protocol !== "https:" && url.protocol !== "http:") {
            throw new Error();
        }
    } catch {
        alert("Digite um link de imagem válido!");
        return;
    }

    const novoFilme = {
        id: Date.now(),
        nome: nome,
        genero: genero,
        nota: notaNumero,
        imagem: imagem,
        tipo: tipo
    };

    // Recuperar catálogo salvo
    let catalogo = JSON.parse(
        localStorage.getItem("catalogoCineStream")
    ) || [];

    // Adicionar novo título
    catalogo.push(novoFilme);

    // Salvar no navegador
    localStorage.setItem(
        "catalogoCineStream",
        JSON.stringify(catalogo)
    );

    // Atualizar catálogo na tela
    mostrarCatalogo();

    // Limpar formulário
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("nota").value = "";
    document.getElementById("imagem").value = "";

    fecharFormulario();

    alert(tipo + " adicionado com sucesso!");
}

// MOSTRAR CATÁLOGO
function mostrarCatalogo() {

    const grade = document.getElementById("grade-filmes");

    let catalogo = JSON.parse(
        localStorage.getItem("catalogoCineStream")
    ) || [];

    // Remover apenas os títulos cadastrados anteriormente
    document.querySelectorAll(".filme-adicionado").forEach(card => {
        card.remove();
    });

    catalogo.forEach(filme => {

        const card = document.createElement("div");

        card.className = "filme-card filme-adicionado";

        const imagem = document.createElement("img");
        imagem.src = filme.imagem;
        imagem.alt = filme.nome;
        imagem.onerror = function() {
            this.src = "https://placehold.co/300x420/181818/ffffff?text=Imagem+indisponivel";
        };

        const info = document.createElement("div");
        info.className = "filme-info";

        const titulo = document.createElement("h3");
        titulo.textContent = filme.nome;

        const detalhes = document.createElement("span");
        detalhes.textContent = filme.genero + " | ★ " +
            filme.nota.toFixed(1);

        const tipo = document.createElement("span");
        tipo.className = "tipo-conteudo";
        tipo.textContent = filme.tipo;

        const excluir = document.createElement("button");
        excluir.className = "btn-excluir";
        excluir.textContent = "Excluir";

        excluir.onclick = function(event) {
            event.stopPropagation();
            excluirFilme(filme.id);
        };

        info.appendChild(titulo);
        info.appendChild(detalhes);
        info.appendChild(tipo);

        card.appendChild(imagem);
        card.appendChild(info);
        card.appendChild(excluir);

        card.onclick = function() {
            assistirFilme(filme.nome);
        };

        grade.appendChild(card);
    });
}

// EXCLUIR FILME OU SÉRIE
function excluirFilme(id) {

    if (!confirm("Deseja realmente excluir este título?")) {
        return;
    }

    let catalogo = JSON.parse(
        localStorage.getItem("catalogoCineStream")
    ) || [];

    catalogo = catalogo.filter(filme => filme.id !== id);

    localStorage.setItem(
        "catalogoCineStream",
        JSON.stringify(catalogo)
    );

    mostrarCatalogo();
}

// FUNÇÃO DE ASSISTIR
function assistirFilme(nome) {
    alert("Você selecionou: " + nome);
}

// CARREGAR CATÁLOGO AO ABRIR O SITE
document.addEventListener("DOMContentLoaded", function() {
    mostrarCatalogo();
});
