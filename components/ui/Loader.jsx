import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <motion.div
            className="flex items-center justify-center h-24"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        >
            <div className="w-12 h-12 rounded-full border-4 border-t-4 border-gray-300 border-t-neon-blue animate-spin" />
        </motion.div>
    );
}
