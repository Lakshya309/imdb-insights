"use client";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900/90 border-b border-slate-700 shadow-lg"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo / Title */}
                <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-lg">
                    CineAI
                </h1>

                {/* Tagline */}
                <p className="text-slate-300 text-sm md:text-base opacity-90 italic tracking-wide drop-shadow-sm">
                    AI-Powered Movie Explorer
                </p>
            </div>

            {/* Optional subtle animated underline */}
            <motion.div
                className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            />
        </motion.nav>
    );
}