const wrapper = document.querySelector(".music-player .wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    mainAudio = wrapper.querySelector("#main-audio"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    progressBar = wrapper.querySelector(".progress-bar"),
    progressArea = wrapper.querySelector(".progress-area"),
    trackId = wrapper.querySelector("#track-id"),
    divContent = document.querySelector(".part2"),
    modalComentario = document.querySelector("#modal-comentario");

let musicIndex = 2; // pegar da session storage

// chamar função loadMusic ao carregar a página
window.addEventListener("load", () => {
    loadMusic(musicIndex);
})

// função para carregar os dados da música
function loadMusic(index) {
    trackId.innerText = 'Intro 01'//${sessionStorage.TRACK_ID}    
    musicName.innerText = `${songList[index].name}`;
    musicArtist.innerText = `${songList[index].artist}`;
    musicImg.src = `../archives/images/${index + 1}.png`;
    mainAudio.src = `../archives/songs${songList[index].src}.mp3`; //`images/${musics[index].img}.jpg`

    let hasLyrics = songList[index].hasLyrics
    showContent(index, hasLyrics);
}

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
                let comentario = criarComentario(div, conteudo.comentario)
            }

            
            div.innerHTML = conteudo.paragrafo
            div.classList.add("lyricsCentered")
            lyricsContent.appendChild(div);
        });
    }
}

function criarComentario(div, comentario) {
    div.classList.add("possui-comentario")
}

// função para tocar a música
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

// função para pausar a música
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
    const isPaused = wrapper.classList.contains("paused");
    isPaused ? pauseMusic() : playMusic();
})

mainAudio.addEventListener("timeupdate", (e) => {
    console.log(e);
    
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    if (currentTime == duration) {
        wrapper.classList.remove("paused");
        playPauseBtn.querySelector("i").innerText = "play_arrow";
    }

    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;
    
    
    // mainAudio.addEventListener("loadeddata", () => {
        let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

        // atualizando tempo total da música
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;

        // atualizando o tempo atual da música
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) {
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    // });
})

mainAudio.addEventListener("loadeddata", () => {
    let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

        // atualizando tempo total da música
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
})

progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
})

const repeatBtn = wrapper.querySelector("#repeat-plist");
// repeatBtn.addEventListener("click", () => {
//     let getText = repeatBtn.innerText;
//     switch(getText) {
//         case "repeat":
//             repeatBtn.innerText = "repeat_one";
//             repeatBtn.setAttribute("title", "Song looped");
//             break;
//         case "repeat_one":
//             repeatBtn.innerText = "repeat";
//             repeatBtn.setAttribute("title", "");
//             break;
//     }
// })

mainAudio.addEventListener("ended", () => {
    let getText = repeatBtn.innerText;

    switch(getText) {
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;
    }
})