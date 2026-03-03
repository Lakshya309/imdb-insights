"use client";
import { motion } from "framer-motion";

export default function MovieCard({ data }) {
  const movie = data?.title;

  if (!movie) return null;

  const formatRuntime = (seconds) => {
    if (!seconds) return "N/A";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-8 mt-10"
    >
      <div className="flex flex-col md:flex-row gap-10">
        {/* Poster */}
        <img
          src={movie.primaryImage?.url || data.image}
          alt={movie.primaryTitle}
          className="w-72 rounded-xl shadow-lg"
        />

        {/* Content */}
        <div className="flex-1">
          {/* Title */}
          <h2 className="text-4xl font-bold">
            {movie.primaryTitle}
            <span className="text-gray-500 ml-2">
              ({movie.startYear})
            </span>
          </h2>

          {/* Ratings */}
          <div className="flex gap-6 mt-4 text-lg">
            <p>
              ⭐ {movie.rating?.aggregateRating || "N/A"} / 10
              <span className="text-sm text-gray-500 ml-1">
                ({movie.rating?.voteCount?.toLocaleString()} votes)
              </span>
            </p>

            {movie.metacritic && (
              <p className="text-green-600 font-semibold">
                Metacritic: {movie.metacritic.score}
              </p>
            )}
          </div>

          {/* Runtime + Genres */}
          <div className="mt-4 text-gray-700">
            <p>Runtime: {formatRuntime(movie.runtimeSeconds)}</p>
            <p>Genres: {movie.genres?.join(", ")}</p>
          </div>

          {/* Plot */}
          <p className="mt-6 text-gray-800 leading-relaxed">
            {movie.plot}
          </p>

          {/* Directors */}
          {movie.directors?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold">Director(s):</h3>
              <p>
                {movie.directors.map((d) => d.displayName).join(", ")}
              </p>
            </div>
          )}

          {/* Writers */}
          {movie.writers?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Writer(s):</h3>
              <p>
                {movie.writers.map((w) => w.displayName).join(", ")}
              </p>
            </div>
          )}

          {/* Stars */}
          {movie.stars?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Stars:</h3>
              <p>
                {movie.stars.map((s) => s.displayName).join(", ")}
              </p>
            </div>
          )}

          {/* Country + Language */}
          <div className="mt-6 text-sm text-gray-600">
            <p>
              Country:{" "}
              {movie.originCountries?.map((c) => c.name).join(", ")}
            </p>
            <p>
              Language:{" "}
              {movie.spokenLanguages?.map((l) => l.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}