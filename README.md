#  Catálogo de Filmes

Esse é um projeto de catálogo de filmes que consome a API oficial do TMDb (The Movie Database). Desenvolvi a aplicação usando Next.js e foquei bastante em componentização, organização do código e em criar uma experiência visual bem agradável e responsiva para o usuário.

---

## Tecnologias que usei
- Next.js (App Router)
- React (Para controle de estados e criação dos componentes)
- TypeScript (Para deixar o código mais seguro e organizado com as tipagens)
- Tailwind CSS (Para toda a parte de estilização e responsividade)
- TanStack Query (Para buscar os dados da API e cuidar do cache)

---

## Requisitos do Teste que foram entregues
- Consumo de API Real: O projeto está totalmente conectado com o TMDb trazendo filmes e informações de verdade.
- Página Inicial (`/`): Mostra a lista de filmes populares do momento usando o componente reutilizável `MovieCard` com pôster, título e ano de lançamento.
- Barra de Busca Inteligente: Criação do componente `SearchBar` que filtra os filmes por nome em tempo real no lado do navegador, sem precisar ficar recarregando a página.
- Página de Detalhes (`/movie/[id]`): Rota dinâmica que abre ao clicar em qualquer filme. Ela busca os dados daquele filme específico na API e mostra o pôster, título, sinopse, nota e a data de lançamento.
- Design Responsivo: O layout se adapta perfeitamente tanto na tela do computador quanto na tela do celular.

### Diferenciais / Bônus que adicionei:
- Telas de Carregamento (Loading): Adicionei efeitos de *Skeleton Screen* (aqueles cards piscantes antes do filme carregar) na página inicial e um spinner na página de detalhes para o usuário saber que o site está carregando.
- Mensagem de "Nenhum resultado": Se você pesquisar por algo que não está na lista, o site avisa que nada foi encontrado.
- Filtro por Gêneros: Criei botões de categorias (Ação, Comédia, Drama, Ficção Científica) que funcionam junto com a barra de busca, tudo em tempo real.
- Implementei o botão 'Carregar Mais', que busca novas páginas da API e acumula os filmes na lista de forma limpa.

---

## Como instalar e rodar o projeto na sua máquina 
Para testar o projeto localmente, siga estes passos no seu terminal:

# 1. Clonar o projeto
git clone [https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git](https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git)
cd film-catalog

## 2. Instalar as dependências do React/Next
-- npm install

## 3. Configurar a Chave da API
Por motivos de segurança, eu não deixei a minha chave da API salva no código. Você vai precisar criar um arquivo chamado .env.local na raiz do projeto e colocar a sua chave do TMDb nele, desse jeito:

NEXT_PUBLIC_TMDB_API_KEY=chave_aqui_do_tmdb

## 4. Rodar o site
npm run dev

## Observações
- Como fiz a Barra de Busca (Filtro no Navegador): Para seguir exatamente o que o teste pedia ("filtrar em tempo real no client-side"), eu usei o TanStack Query para carregar a lista de filmes populares apenas uma vez quando a página abre. Depois disso, quando você digita na barra de busca ou clica em um gênero, o próprio JavaScript filtra os filmes que já estão na tela na mesma hora. Isso deixa o site super rápido, sem precisar ficar carregando a página de novo a cada letra digitada.
- Primeira vez usando Tailwind CSS: Este foi o meu primeiro projeto prático utilizando o Tailwind CSS para estilização. Foi um desafio excelente para entender como funcionam as classes utilitárias na prática e como construir um layout totalmente responsivo de forma rápida, mantendo a fidelidade ao design que planejei no Figma.
- Segurança da Chave da API: Como uma boa prática de segurança, eu não deixei a minha chave do TMDb colada direto no código. Usei as variáveis de ambiente do Next.js (o arquivo `.env.local`), deixando o projeto seguro e pronto para que vocês consigam rodar na máquina apenas colocando a sua própria chave.