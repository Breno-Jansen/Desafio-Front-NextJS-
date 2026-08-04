# Desafio-Front-NextJS-
### Breno Jansen
## Como rodar
Para utilizar a aplicação, abra o terminal, entre na pasta correta (cd Desafio-Front-NextJS-) e rode o comando:
npm run dev
Se não abrir baixe as dependências requisitadas após o comando.

API utilizada: TVmaze
link: https://www.tvmaze.com/api

## Perfuntas de reflexão:
1. *Por que a busca inicial dos dados na rota `/explorar` foi feita em um Server Component em vez de um Client Component?*
    Na verdade, essa rota foi implementada com client component para ter interatividade em tempo real no campo de busca. Mas na landing page foi usado Server Components para garantir que o HTML venha pré renderizado, com um bom SEO.
2. *Se precisarmos adicionar um botão de "Curtir / Favoritar" dentro de cada Card da vitrine, como você estruturaria esse componente mantendo a performance da aplicação?*
    Daria pra inserir um componente dentro de cada card e ao clicar ele é alterado e salvo no armazenamento interno
3. *Em sua implementação, como você usou o useState e useEffect? Como eles impactam as renderizações do sistema?*
    O useState gerenciou a lista de shows o texto search e o carregamento loading.O useEffect foi usado no carregamento para buscar os itens e para escutar a busca com debounce.
4. *Quais métodos HTTP foram utilizados e por que o projeto utiliza principalmente o método `GET`?*
        Foi utilizado somente o GET porque a API do TVmaze é uma base de dados pública e read-only. Então a aplicação apenas consulta e filtra.
5. *Foram usadas variáveis centralizadas no código? Como você implementou isso?*
    Sim. Foram utilizadas variáveis de fontes como --font-geist-sans, zinc-950 e purple-600, centralizadas no layout.tsx e globals.tsx e interfaces centralizadas nos arquivos page.tsx para tipagem como interface Show e interface ShowDetail
6. *Como a aplicação se adapta a telas de celular, tablet e desktop? Quais mecanismos você utilizou para isso?*
    Foram utilizados CSS Grid e Flexbox ajustados por breakpoints:
    - Celular: grid-cols-2 (2 colunas)

    - Tablet: md:grid-cols-4 (4 colunas)

    - Desktop: lg:grid-cols-5 (5 colunas)

    Ajuste de fontes e espaçamentos dinâmicos (ex: text-4xl sm:text-6xl).
7. *O filtro é aplicado apenas aos itens da página atual ou a todos os itens disponíveis na API?*
    É aplicado em todos os itens da API TVmaze. Ao pesquisar, o app faz uma chamada para o termo dentro do banco de dados da plataforma.
