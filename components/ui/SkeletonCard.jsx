// Skeleton placeholder for movie cards
import { motion } from 'framer-motion';

export default function SkeletonCard() {
    return (
        <motion.div
            className="flex flex-col gap-2 p-4 bg-glass rounded-2xl shadow-glass animate-pulse"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        >
            <div className="w-full h-48 bg-gray-700 rounded-lg" />
            <div className="h-4 bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-700 rounded w-1/2" />
        </motion.div>
    );
}
