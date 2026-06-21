import { Movie } from "@/services/tmdb";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    
    <Link 
      href={`/movie/${movie.id}`}
      className="group bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-amber-500 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
        {movie.poster_path ? (
          <img 
            src={imageUrl} 
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4 text-center text-xs text-zinc-500">
            Sem Pôster
          </div>
        )}
        
        <div className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur-md text-amber-400 font-bold text-xs px-2 py-1 rounded border border-amber-500/30">
          ★ {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="p-3 flex flex-col justify-between flex-1">
        <h3 className="font-semibold text-sm line-clamp-2 text-zinc-100 group-hover:text-amber-500 transition-colors">
          {movie.title}
        </h3>
        
        <p className="text-xs text-zinc-500 mt-1">
          {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
        </p>
      </div>

    </Link>
  );
}