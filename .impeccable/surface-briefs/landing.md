# Landing page Sorvebom

## Current direction — 01 November 2026

<!-- impeccable:product-schema 1 -->

Mode: Experience / Persuade / Interact.
Inspirado na arquitetura e dinamismo de Drinkzoi, HOZON, TŌPAS e YAAS.

## Direction contract

### THESIS
Uma experiência digital imersiva, cinemática e tátil para a **Sorvebom Sorvetes** (fundada em 1983 no Vale do Taquari, RS). O scroll do usuário controla a física do tempo, quebrando o gelo que envolve o sorvete em alta definição e transicionando fluidamente para uma galeria viva de fotos com dolly zoom, profundidade de campo e ingredientes flutuantes em 3D.

### OWN-WORLD
- **Paleta**: Fundo escuro glacial profundo (`#0E0E0E` / `#101114`), transicionando para tons ricos de calda de frutas vermelhas (`#1C0D14`) e cacau aveludado (`#160D08`), com acentos em ouro solar (`#FFC933`), baga framboesa (`#C8005A`) e creme puro.
- **Tipografia**:
  - `Syne` 800: monumental, arquitetural e escultural (wordmarks de fundo `SORVEBOM` e `CREMOSIDADE`).
  - `Instrument Serif` Italic 400: elegância editorial clássica para contrastes conceituais.
  - `Space Grotesk` 700: modernismo neo-grotesco suíço para títulos de impacto.
  - `Instrument Sans` 400/500/600: clareza de leitura cristalina em textos explicativos.
  - `Space Mono` 400/700: telemetria técnica precisa, tags de estágio e coordenadas.

### SIGNATURE INTERACTION
1. **Vídeo Scrub Fluido a 60fps**:
   - O centro da tela fica 100% desobstruído para a reprodução do vídeo 1080p do sorvete derretendo e quebrando a crosta de gelo (`hero-ice-burst.mp4`).
   - Motor de interpolação por velocidade: o vídeo avança continuamente de forma proporcional à velocidade de rolagem do usuário, sem paradas quadro a quadro (*no keyframe stepping*).
   - HUD 100% flutuante e borderless (sem caixa retangular opaca, sem porcentagem poluindo o visual e sem marca d'água no centro).
2. **Galeria Cinética com Câmera Dolly Zoom**:
   - Ao rolar para fora do vídeo, cada imagem entra no campo de visão e se expande dinamicamente (`scale(0.88 -> 1.22)`, `translateZ(70px)`).
   - Desfoque cinematográfico periférico (*bokeh*) e rotações axiais tridimensionais (`rotateX`, `rotateY`, `rotateZ`) nos cartões adjacentes.
   - Ingredientes com parallax tridimensional flutuando no espaço entre o observador e a tela (morangos, chocolates, lascas de gelo, hortelã).
3. **Vitrine Dinâmica de Produtos**:
   - Slider interativo com linha Mag Trufada, Picolés de Fruta e Potes Especiais, conectado diretamente ao WhatsApp comercial da fábrica.

### HONEST CONTENT
- Toda a narrativa celebra a história verídica da Sorvebom: mais de 40 anos de tradição fabril em Lajeado e Estrela - RS.
- Sem métricas falsas ou números inventados.
- Contatos diretos: WhatsApp comercial (`(51) 99979-3004`) e telefone oficial (`(51) 3710-1094`).
