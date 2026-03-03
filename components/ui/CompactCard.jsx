// Compact movie card for search results grid
"use client";
import { motion } from "framer-motion";

export default function CompactCard({ movie, onClick }) {
    const posterUrl = movie.primaryImage?.url || movie.image || "/placeholder.png";

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative flex flex-col h-full bg-glass shadow-glass rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/30 transition-colors"
            onClick={onClick}
        >
            {/* Poster */}
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={posterUrl}
                    alt={movie.primaryTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">View Details</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 bg-gradient-to-b from-transparent to-black/20 flex-1 flex flex-col justify-center">
                <h3 className="text-sm font-bold text-gray-100 group-hover:text-primary transition-colors line-clamp-1">
                    {movie.primaryTitle}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                    {movie.startYear || "N/A"}
                </p>
            </div>
        </motion.div>
    );
}
