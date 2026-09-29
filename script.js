const inputBuscar = document.getElementById('buscar');
const botaoEnviar = document.getElementById('button');

botaoEnviar.addEventListener('click', function() {
    const nomeStreamer = inputBuscar.value.trim();

    if (nomeStreamer === "") {
        alert("Digite o nome de um streamer!");
        return;
    }

    // Limpa a tela atual (some com o menu)
    document.body.innerHTML = "";

    // SE estiver abrindo via file:/// (sem hostname), o parent vira "localhost" ou vazio controlado. 
    // Se estiver na web, usa o domínio real automaticamente!
    let hostAtual = window.location.hostname;
    if (!hostAtual || hostAtual === "") {
        hostAtual = "localhost"; // Força localhost quando rodar direto do arquivo local
    }

    // Cria o container principal do player (.twitch)
    const containerTwitch = document.createElement('div');
    containerTwitch.className = 'twitch';

    // Cria o bloco do vídeo
    const divVideo = document.createElement('div');
    divVideo.className = 'twitch-video';
    
    const iframeVideo = document.createElement('iframe');
    iframeVideo.src = `https://player.twitch.tv/?channel=${nomeStreamer}&parent=${hostAtual}`;
    iframeVideo.setAttribute('frameborder', '0');
    iframeVideo.setAttribute('scrolling', 'no');
    iframeVideo.setAttribute('allowfullscreen', 'true');
    
    divVideo.appendChild(iframeVideo);

    // Cria o bloco do chat
    const divChat = document.createElement('div');
    divChat.className = 'twitch-chat';
    
    const iframeChat = document.createElement('iframe');
    iframeChat.src = `https://www.twitch.tv/embed/${nomeStreamer}/chat?parent=${hostAtual}`;
    iframeChat.setAttribute('frameborder', '0');
    iframeChat.setAttribute('scrolling', 'no');
    
    divChat.appendChild(iframeChat);

    // Junta tudo e joga na tela
    containerTwitch.appendChild(divVideo);
    containerTwitch.appendChild(divChat);
    document.body.appendChild(containerTwitch);
});

// Atalho para apertar Enter
inputBuscar.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        botaoEnviar.click();
    }
});