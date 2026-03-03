// ErrorState component for displaying API errors with subtle animation
import { motion } from 'framer-motion';

export default function ErrorState({ message }) {
    return (
        <motion.div
            className="flex flex-col items-center justify-center p-6 bg-red-900/30 rounded-2xl text-red-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-center text-lg font-medium">{message || 'Something went wrong.'}</p>
        </motion.div>
    );
}
