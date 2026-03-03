"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="w-full min-h-[70vh] flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl text-center space-y-8"
            >
                <h1
                    className="text-5xl md:text-6xl font-medium leading-tight text-slate-900"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Discover Movies with
                    <span className="block text-indigo-500 mt-2">
                        Intelligent Search
                    </span>
                </h1>

                <p
                    className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    Search by IMDb ID or movie title.
                    View detailed insights, ratings, and cinematic metadata instantly.
                </p>

                <div className="text-sm text-slate-500 space-y-2 pt-4">
                    <p>• Choose search mode (ID or Title)</p>
                    <p>• Enter your query</p>
                    <p>• Explore detailed movie insights</p>
                </div>
            </motion.div>
        </section>
    );
}