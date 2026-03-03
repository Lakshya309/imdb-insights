"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchSection({ onSearch, loading }) {
    const [mode, setMode] = useState("id");
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setError("Please enter a value.");
            return;
        }
        setError("");
        onSearch(mode, query);
    };

    return (
        <section className="relative w-full max-w-5xl mx-auto px-6 pb-32">

            {/* Headline */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-14"
            >
                <h2
                    className="text-5xl md:text-6xl font-light italic tracking-wide text-slate-900"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    discover.
                </h2>

                <p className="text-slate-500 mt-4 text-lg">
                    Search any film by IMDb ID or title.
                </p>
            </motion.div>

            {/* Search Form */}
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-10"
            >
                {/* Mode Toggle */}
                <div className="flex justify-center gap-10 text-base">
                    <button
                        type="button"
                        onClick={() => setMode("id")}
                        className={`pb-2 border-b-2 transition-all duration-300 ${mode === "id"
                                ? "border-indigo-500 text-slate-900"
                                : "border-transparent text-slate-400 hover:text-slate-700"
                            }`}
                    >
                        Search by ID
                    </button>

                    <button
                        type="button"
                        onClick={() => setMode("title")}
                        className={`pb-2 border-b-2 transition-all duration-300 ${mode === "title"
                                ? "border-indigo-500 text-slate-900"
                                : "border-transparent text-slate-400 hover:text-slate-700"
                            }`}
                    >
                        Search by Title
                    </button>
                </div>

                {/* Input + Button */}
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={
                            mode === "id"
                                ? "tt0133093"
                                : "Inception"
                        }
                        className="
              flex-1 
              px-8 
              py-6 
              text-lg 
              rounded-full 
              border 
              border-slate-200 
              bg-white/70 
              backdrop-blur-xl
              shadow-sm
              focus:outline-none 
              focus:ring-2 
              focus:ring-indigo-500
              transition
            "
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
              px-10 
              py-6 
              text-lg
              rounded-full 
              bg-slate-900 
              text-white 
              hover:bg-indigo-600 
              transition-all 
              duration-300
              disabled:opacity-50
              shadow-lg
            "
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 text-sm text-center">
                        {error}
                    </p>
                )}
            </motion.form>
        </section>
    );
}