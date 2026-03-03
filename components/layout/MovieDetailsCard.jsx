"use client";
import { motion } from "framer-motion";
import AudienceInsights from "./AudienceInsights";

export default function MovieDetailsCard({ data }) {
    const movie = data?.data;

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

                    {/* 📄 Movie Info */}
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
                            <span className="font-medium">Runtime:</span>{" "}
                            {Math.floor(movie.runtimeSeconds / 60)} min
                        </div>
                    </div>
                </div>

                {/* -------------------- AI Cinematic Summary -------------------- */}
                {movie.aiSummary && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-2xl p-6 shadow-lg mt-8"
                    >
                        <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                            AI Cinematic Analysis
                        </h3>
                        <p className="text-slate-700 whitespace-pre-line">{movie.aiSummary}</p>
                    </motion.div>
                )}

                {/* -------------------- Audience Insights Component -------------------- */}
                <AudienceInsights imdbId={movie.id || movie.imdbId} />
            </div>
        </motion.div>
    );
}