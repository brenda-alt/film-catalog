export interface Movie{
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}


export interface TMDBResponse{
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

// Chave da API no .env.local.
const API_KEY =  process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Função filmes populares
export async function getPopularMovies(page: number = 1): Promise<TMDBResponse> {
  if (!API_KEY) {
    throw new Error("A chave de API do TMDb não foi configurada no .env.local");
  }

  
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar filmes populares no TMDb");
  }

  return response.json();
}

// buscar filmes por uma palavra chave 
export async function searchMovies(query: string, page = 1): Promise<TMDBResponse> {
    if (!API_KEY){
        throw new Error("A chave de API do TMDb não foi configurada no .env.local");
    }

    // se o usuario não digitou nada, retorna um objeto vazio simulando a estrutura da API
    if(!query.trim()){
        return { page: 1, results: [], total_pages: 0, total_results: 0};
    }    

   
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`
    );

    if (!response.ok){
        throw new Error("Falha ao pesquisar os filmes")
    }

    return response.json()
    }

// filmes filtrados por um ID de gênero específico
export async function getMoviesByGenre(genreId: number, page = 1): Promise<TMDBResponse> {
    if (!API_KEY){
        throw new Error("A chave de API não foi configurada no .env.local");
    }

    const response = await fetch(
       `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
    );
    
    if (!response.ok){
        throw new Error("Falha ao buscar os filmes por gênero");
    }

    return response.json();
}

export async function getMovieDetails(id: string): Promise<Movie> {
  if (!API_KEY) {
    throw new Error("A chave de API do TMDb não foi configurada no .env.local");
  }

  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar os detalhes do filme no TMDb");
  }

  return response.json();
}
       