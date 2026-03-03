"use client";
import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^tt\d{7,9}$/.test(id)) {
      setError("Invalid IMDb ID (e.g., tt0133093)");
      return;
    }

    setError("");
    onSearch(id);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter IMDb ID"
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