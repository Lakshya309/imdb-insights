"use client";
import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [mode, setMode] = useState("id");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Field cannot be empty");
      return;
    }

    if (mode === "id" && !/^tt\d{7,9}$/.test(query)) {
      setError("Invalid IMDb ID (e.g., tt0133093)");
      return;
    }

    setError("");
    onSearch(mode, query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      
      {/* Mode Toggle */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setMode("id")}
          className={`px-4 py-1 rounded-full ${
            mode === "id" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Search by ID
        </button>

        <button
          type="button"
          onClick={() => setMode("title")}
          className={`px-4 py-1 rounded-full ${
            mode === "title" ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          Search by Title
        </button>
      </div>

      {/* Input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={
          mode === "id"
            ? "Enter IMDb ID (tt0133093)"
            : "Enter Movie Title (e.g., Inception)"
        }
        className="border px-4 py-2 rounded-lg w-80"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-80 transition"
      >
        Search
      </button>
    </form>
  );
}