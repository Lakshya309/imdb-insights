"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MovieDetailsCard({ data }) {
    const movie = data?.data;

    const [aiSummary, setAiSummary] = useState(null);
    const [loadingSummary, setLoadingSummary] = useState(false);

    useEffect(() => {
        if (!movie) return;
        generateSummary();
    }, [movie?.id]);

    async function generateSummary() {
        setLoadingSummary(true);
        setAiSummary(null);

        try {
            const res = await fetch("/api/summary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    primaryTitle: movie.primaryTitle,
                    startYear: movie.startYear,
                    genres: movie.genres?.join(", "),
                    plot: movie.plot,
                    rating: movie.rating?.aggregateRating,
                }),
            });

            const result = await res.json();
            setAiSummary(result.summary);
        } catch (err) {
            console.error("Summary error:", err);
            setAiSummary("Failed to generate AI summary.");
        }

        setLoadingSummary(false);
    }

    if (!movie) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-6 pb-24"
        >
            {/* Main Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row gap-10">

                    {/* 🎬 Poster */}
                    {movie.primaryImage?.url && (
                        <div className="flex-shrink-0">
                            <img
                                src={movie.primaryImage.url}
                                alt={movie.primaryTitle}
                                className="w-64 md:w-72 rounded-2xl shadow-lg object-cover"
                            />
                        </div>
                    )}

                    {/* 📄 Info Section */}
                    <div className="flex-1 flex flex-col">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                            {movie.primaryTitle}
                        </h2>

                        <p className="text-slate-600 leading-relaxed mb-6 text-lg md:text-xl">
                            {movie.plot}
                        </p>

                        <div className="text-sm md:text-base text-slate-500 flex flex-wrap gap-6 mb-8">
                            <span className="font-medium">Year:</span> {movie.startYear}
                            <span className="font-medium">Genre:</span> {movie.genres?.join(", ")}
                            <span className="font-medium">IMDb:</span> {movie.rating?.aggregateRating}
                            <span className="font-medium">Runtime:</span> {Math.floor(movie.runtimeSeconds / 60)} min
                        </div>

                        {/* 🧠 AI Summary Section */}
                        <div className="mt-auto border-t pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-semibold text-slate-900">
                                    AI Cinematic Analysis
                                </h3>
                                <button
                                    onClick={generateSummary}
                                    className="text-sm md:text-base font-medium text-blue-600 hover:text-blue-800 transition"
                                >
                                    Regenerate
                                </button>
                            </div>

                            {loadingSummary && (
                                <div className="space-y-3 animate-pulse">
                                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                </div>
                            )}

                            {!loadingSummary && aiSummary && (
                                <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-100 rounded-xl p-4 shadow-sm text-slate-700 leading-relaxed whitespace-pre-line text-base md:text-lg">
                                    {aiSummary}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}