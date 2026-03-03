// EmptyState component for handling no results or initial state
import { motion } from 'framer-motion';

export default function EmptyState({ title = "No results found", description = "Try a different search term." }) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mb-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-200 mb-2">{title}</h2>
            <p className="text-gray-400">{description}</p>
        </motion.div>
    );
}
