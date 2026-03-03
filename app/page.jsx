"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

const fetchMovie = async (mode, query) => {
  setLoading(true);
  setMovie(null);

  let url =
    mode === "id"
      ? `/api/movie?id=${query}`
      : `/api/movie?title=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  setMovie(data);
  setLoading(false);
};

  return (
    <main className="min-h-screen flex flex-col items-center p-10 bg-gradient-to-br from-gray-100 to-gray-200">
  <h1 className="text-4xl font-bold mb-8">
    IMDb Movie Insights
  </h1>

  <SearchForm onSearch={fetchMovie} />

  {loading && <p className="mt-6">Loading...</p>}

  {/* 🔴 Error */}
  {movie?.error && (
    <p className="text-red-500 mt-6">{movie.error}</p>
  )}

  {/* 🟢 Single Movie View */}
  {movie?.type === "single" && (
    <MovieCard data={{ title: movie.data }} />
  )}

  {/* 🔵 Search Results Grid */}
  {movie?.type === "search" && (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
      {movie.results.map((item) => (
        <div
          key={item.id}
          onClick={() => fetchMovie("id", item.id)}
          className="cursor-pointer bg-white shadow rounded-lg p-4 hover:scale-105 transition"
        >
          <img
            src={item.primaryImage?.url}
            className="rounded-lg"
            alt={item.primaryTitle}
          />
          <h3 className="mt-2 font-semibold text-sm">
            {item.primaryTitle}
          </h3>
          <p className="text-xs text-gray-500">
            {item.startYear}
          </p>
        </div>
      ))}
    </div>
  )}
</main>
  );
}