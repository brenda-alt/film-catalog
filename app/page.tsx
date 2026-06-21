"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies, Movie } from "@/services/tmdb";

const GENRES = [
  { id: 28, name: "Ação" },
  { id: 35, name: "Comédia" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Ficção Científica" },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  
  // Estados para controlar a paginação
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  // Buscamos os filmes populares baseados no estado 'page'
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["popularMovies", page],
    queryFn: () => getPopularMovies(page),
  });

  // Toda vez que a API trouxer dados novos, juntamos eles na nossa lista acumulada
  useEffect(() => {
    if (data?.results) {
      setAllMovies((prevMovies) => {
        // Evita duplicar filmes caso o React Query refaça a busca
        const existingIds = new Set(prevMovies.map(m => m.id));
        const newMovies = data.results.filter(m => !existingIds.has(m.id));
        return [...prevMovies, ...newMovies];
      });
    }
  }, [data]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(selectedGenre === genreId ? null : genreId);
  };

  // --- FILTRO CLIENT-SIDE (Aplicado em cima de TODOS os filmes acumulados) ---
  const filteredMovies = allMovies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesGenre = selectedGenre
      ? movie.genre_ids.includes(selectedGenre)
      : true;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center">
      
      {/* HEADER */}
      <header className="w-full max-w-7xl p-6 flex justify-between items-center border-b border-zinc-800">
        <span className="text-xl font-bold tracking-wider text-zinc-200">Home Session</span>
      </header>

      {/* HERO SECTION */}
      <main className="w-full max-w-4xl flex flex-col items-center justify-center pt-20 px-4 text-center gap-6">
        <h1 className="text-6xl font-black tracking-tighter text-amber-500">
          HOME SESSION
        </h1>
        
        <SearchBar onSearch={handleSearch} />

        {/* Lista de Gêneros */}
        <div className="flex gap-4 text-sm text-zinc-400 font-medium overflow-x-auto pb-2 max-w-full">
          {GENRES.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`px-3 py-1 rounded-full transition-all border ${
                selectedGenre === genre.id
                  ? "bg-amber-500 text-zinc-950 border-amber-500 font-bold"
                  : "bg-zinc-900 border-zinc-800 hover:text-amber-500 hover:border-amber-500/50"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </main>

      {/* LISTA DE FILMES */}
      <section className="w-full max-w-7xl px-6 py-12">
        <h2 className="text-2xl font-bold mb-6 text-zinc-100 border-l-4 border-amber-500 pl-3">
          {searchQuery ? `Resultados para: ${searchQuery}` : "Filmes Populares"}
        </h2>
        
        {/* LOADING INICIAL */}
        {isLoading && allMovies.length === 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-zinc-900 rounded-lg h-80 animate-pulse border border-zinc-800" />
            ))}
          </div>
        )}

        {/* ERRO */}
        {isError && allMovies.length === 0 && (
          <div className="text-center py-10">
            <p className="text-red-500 font-medium">Ops! Ocorreu um erro ao carregar os filmes.</p>
            <p className="text-xs text-zinc-500 mt-2">{(error as Error).message}</p>
          </div>
        )}

        {/* RENDERIZAÇÃO DOS FILMES */}
        {allMovies.length > 0 && (
          <>
            {filteredMovies.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                Nenhum filme encontrado para o filtro aplicado.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}

            {/* BOTÃO CARREGAR MAIS */}
            {!searchQuery && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={isFetching}
                  className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isFetching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                      Carregando...
                    </>
                  ) : (
                    "Carregar Mais Filmes"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </section>

    </div>
  );
}