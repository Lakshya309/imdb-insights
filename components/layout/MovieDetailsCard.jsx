"use client";
import { motion } from "framer-motion";

export default function MovieDetailsCard({ data }) {
    const movie = data?.data;

    if (!movie) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto px-6 pb-24"
        >
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">

                <div className="flex flex-col md:flex-row gap-10">

                    {/* 🎬 Poster */}
                    {movie.primaryImage?.url && (
                        <div className="flex-shrink-0">
                            <img
                                src={movie.primaryImage.url}
                                alt={movie.primaryTitle}
                                className="w-64 md:w-72 rounded-2xl shadow-xl object-cover"
                            />
                        </div>
                    )}

                    {/* 📄 Info Section */}
                    <div className="flex-1">
                        <h2 className="text-4xl font-medium mb-4 text-slate-900">
                            {movie.primaryTitle}
                        </h2>

                        <p className="text-slate-600 leading-relaxed mb-6">
                            {movie.plot}
                        </p>

                        <div className="text-sm text-slate-500 flex flex-wrap gap-6">
                            <span>Year: {movie.startYear}</span>
                            <span>Genre: {movie.genres?.join(", ")}</span>
                            <span>IMDb: {movie.rating?.aggregateRating}</span>
                            <span>
                                Runtime: {Math.floor(movie.runtimeSeconds / 60)} min
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}