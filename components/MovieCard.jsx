"use client";
import { motion } from "framer-motion";
import Badge from "./ui/Badge";

export default function MovieCard({ data }) {
  const movie = data?.title || data; // Handle both search result and single movie data structures

  if (!movie) return null;

  const formatRuntime = (seconds) => {
    if (!seconds) return "N/A";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const posterUrl = movie.primaryImage?.url || movie.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-glass shadow-glass rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Poster Wrapper */}
        <div className="relative w-full md:w-1/3 lg:w-1/4 shrink-0 overflow-hidden group">
          <img
            src={posterUrl}
            alt={movie.primaryTitle}
            className="w-full h-full object-cover aspect-[2/3] group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
        </div>

        {/* Content Wrapper */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight break-words">
                {movie.primaryTitle}
                <span className="text-gray-500 font-normal ml-3">
                  ({movie.startYear})
                </span>
              </h2>
              {movie.rating?.aggregateRating && (
                <div className="flex items-center bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full shrink-0">
                  <span className="text-yellow-400 mr-2 font-bold">⭐ {movie.rating.aggregateRating}</span>
                  <span className="text-xs text-yellow-400/60 font-medium">/ 10</span>
                </div>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-2 mb-6 text-sm text-gray-400 font-medium">
              <span className="bg-white/5 py-1 px-3 rounded-md border border-white/10 uppercase tracking-widest text-xs">
                {formatRuntime(movie.runtimeSeconds)}
              </span>
              {movie.genres?.map((genre) => (
                <Badge key={genre} color="primary">{genre}</Badge>
              ))}
            </div>

            {/* Plot */}
            {movie.plot && (
              <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-6 lg:line-clamp-none mb-6 italic border-l-2 border-primary/30 pl-4 bg-white/5 py-3 rounded-r-lg">
                "{movie.plot}"
              </p>
            )}

            {/* Credits Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-6">
              {movie.directors?.length > 0 && (
                <div>
                  <h4 className="text-primary uppercase tracking-widest text-[10px] font-bold mb-1">Director</h4>
                  <p className="text-gray-300 truncate">{movie.directors.map(d => d.displayName).join(", ")}</p>
                </div>
              )}
              {movie.stars?.length > 0 && (
                <div>
                  <h4 className="text-accent uppercase tracking-widest text-[10px] font-bold mb-1">Stars</h4>
                  <p className="text-gray-300 truncate">{movie.stars.map(s => s.displayName).join(", ")}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 text-[11px] text-gray-500 font-bold uppercase tracking-widest">
            {movie.originCountries && (
              <span>Country: {movie.originCountries.map(c => c.name).join(", ")}</span>
            )}
            {movie.spokenLanguages && (
              <span>Language: {movie.spokenLanguages.map(l => l.name).join(", ")}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
