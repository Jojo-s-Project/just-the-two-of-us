const divContent = document.querySelector(".part2"),
    modal = document.getElementById('janela-modal'),
    comentarioModal = document.getElementById('modal');

function showContent(index, hasLyrics) {
    let content = songList[index].conteudo
    if (!hasLyrics) {

        let textContent = document.createElement("div")
        textContent.setAttribute("class", "textContent")
        divContent.appendChild(textContent)

        content.forEach(conteudo => {
            let paragraph = document.createElement("p");
            paragraph.innerText = conteudo.paragrafo
            textContent.appendChild(paragraph);
        });
    } else {

        let lyricsContent = document.createElement("div")
        lyricsContent.setAttribute("class", "lyricsContent")
        divContent.appendChild(lyricsContent)

        // praticamente igual, com adição dos comentários da Jojo nas letras
        content.forEach(conteudo => {
            let div = document.createElement("div");

            let hasComentario = Object.keys(conteudo).includes("comentario")
            if (hasComentario) {
                criarComentario(div, conteudo.comentario)
            }


            div.innerHTML = conteudo.paragrafo
            div.classList.add("lyricsCentered")
            lyricsContent.appendChild(div);
        });
    }
}

function criarComentario(div, comentario) {
    div.classList.add("possui-comentario")


    div.addEventListener('click', () => {
        comentarioModal.innerHTML = ''

        let botaoFechar = document.createElement('button')
        botaoFechar.classList.add('fechar')
        botaoFechar.setAttribute('id', 'fechar')
        botaoFechar.innerText = 'X'
        comentarioModal.appendChild(botaoFechar)

        comentarioModal.innerHTML += comentario;
        abrirModal()
    })
}

function abrirModal() {
    modal.classList.add('abrir')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal') {
            modal.classList.remove('abrir')
        }
    })
}