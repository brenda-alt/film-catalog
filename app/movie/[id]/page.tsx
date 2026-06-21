"use client";

import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/services/tmdb";
import { useParams, useRouter } from "next/navigation";

export default function MovieDetails() {
  // 1. Pegamos o ID do filme diretamente da URL da página
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // 2. Buscamos os dados individuais do filme via TanStack Query
  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
    enabled: !!id, // Só dispara a busca se o ID existir na URL
  });

  // 3. Estado de carregamento visual
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 4. Estado de erro
  if (isError || !movie) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-semibold">Erro ao carregar os detalhes do filme.</p>
        <button onClick={() => router.push("/")} className="px-4 py-2 bg-zinc-800 text-zinc-200 rounded">
          Voltar para a Home
        </button>
      </div>
    );
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center">
      
      {/* HEADER SIMPLES */}
      <header className="w-full max-w-7xl p-6 flex justify-between items-center border-b border-zinc-800">
        <span onClick={() => router.push("/")} className="text-xl font-bold tracking-wider cursor-pointer hover:text-amber-500 transition-colors">
          CINEFLIX
        </span>
        <button onClick={() => router.push("/")} className="text-sm font-medium hover:text-amber-500 transition-colors">
          ← Voltar
        </button>
      </header>

      {/* CONTEÚDO DOS DETALHES */}
      <main className="w-full max-w-5xl px-6 py-12 md:py-20 flex flex-col md:flex-row gap-8 items-center md:items-start">
        
        {/* Pôster do Filme */}
        <div className="w-64 md:w-80 flex-shrink-0 aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          {movie.poster_path ? (
            <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500">Sem Imagem</div>
          )}
        </div>

        {/* Informações Textuais (Requisitos Mínimos) */}
        <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight">
              {movie.title}
            </h1>
            <p className="text-amber-500 font-bold text-lg mt-2">
              ★ {movie.vote_average.toFixed(1)} / 10
            </p>
          </div>

          <div className="border-t border-b border-zinc-800 py-4 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-zinc-400">
            <div>
              <span className="font-semibold text-zinc-300">Lançamento:</span>{" "}
              {movie.release_date ? new Date(movie.release_date).toLocaleDateString("pt-BR") : "N/A"}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-zinc-100 border-l-4 border-amber-500 pl-3">
              Sinopse
            </h2>
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
              {movie.overview || "Nenhuma sinopse disponível para este filme."}
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}