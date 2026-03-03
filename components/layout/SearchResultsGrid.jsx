// SearchResultsGrid component using CompactCard for a cleaner responsive layout
import { motion } from 'framer-motion';
import SkeletonCard from '@/components/ui/SkeletonCard';
import CompactCard from '@/components/ui/CompactCard';

export default function SearchResultsGrid({ results, onSelect, loading }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
    };

    if (loading) {
        const placeholders = Array.from({ length: 8 });
        return (
            <motion.div
                className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {placeholders.map((_, i) => (
                    <motion.div key={i} variants={item}>
                        <SkeletonCard />
                    </motion.div>
                ))}
            </motion.div>
        );
    }

    if (!results || results.length === 0) {
        return null;
    }

    return (
        <div className="w-full mt-12 px-4 md:px-0">
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-gray-400 uppercase tracking-[0.2em] flex items-center gap-4">
                <span className="h-1 w-12 bg-primary rounded-full"></span>
                Search Results
            </h2>
            <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 w-full"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {results.map((movie) => (
                    <motion.div key={movie.id} variants={item}>
                        <CompactCard movie={movie} onClick={() => onSelect('id', movie.id)} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
