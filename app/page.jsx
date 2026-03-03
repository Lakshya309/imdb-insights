"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovie = async (id) => {
    setLoading(true);
    setMovie(null);

    try {
      const res = await fetch(`/api/movie?id=${id}`);
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      setMovie({ error: "Something went wrong" });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10 bg-gradient-to-br from-gray-100 to-gray-200">
      <h1 className="text-4xl font-bold mb-8">
        IMDb Movie Insights
      </h1>

      <SearchForm onSearch={fetchMovie} />

      {loading && <p className="mt-6">Loading...</p>}

      {movie && !movie.error && <MovieCard data={movie} />}

      {movie?.error && (
        <p className="text-red-500 mt-6">{movie.error}</p>
      )}
    </main>
  );
}