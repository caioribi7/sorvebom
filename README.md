# Sorvebom Sorvetes — Landing Page (MCode)

Landing page da **Sorvebom** (Lajeado/Estrela - RS, desde 1983), redesenhada pela **MCode** na direção "Calda": magenta do logo como cor dominante, creme e chocolate, fotos oficiais das embalagens e tipografia condensada expressiva.

## Seções

1. **Hero** — "Gelado de verdade.", Mag Cookies em destaque e chamadas para sabores e lojas.
2. **Escolha sua linha** — Linha Mag, Picolés de Fruta, Potes Clássicos e Zero Açúcar.
3. **Nossa história** — 1983, Martin e Tania Eckhardt, certificação FSSC 22000.
4. **Passa aqui** — lojas e fábrica com telefone e rota no Google Maps.
5. **Para o seu negócio** — revenda, franquia e eventos via WhatsApp.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Página única, HTML semântico |
| `css/tokens.css` | Paleta, fontes e espaçamentos |
| `css/styles.css` | Layout e componentes, com breakpoints em 1240, 960 e 600 px |
| `js/main.js` | Menu mobile e links de WhatsApp (`data-whatsapp`, `data-whatsapp-message`) |
| `assets/images/produtos/` | Fotos oficiais recortadas (`.png` original, `.webp` usado no site) |
| `assets/images/CREDITOS.md` | Origem e licença das imagens |

O design de referência está no Paper (arquivo "sorvebom", artboard "Landing — Desktop").

## Visualizar localmente

```powershell
python -m http.server 4173
```

Abra http://127.0.0.1:4173. Não há build: HTML, CSS e JavaScript puros.

## Pendências com o cliente

- Confirmar o número da loja Júlio de Castilhos (630 no briefing, 693 em listagens públicas).
- Confirmar se as lojas de Tramandaí e Capão da Canoa devem entrar na seção "Passa aqui".
