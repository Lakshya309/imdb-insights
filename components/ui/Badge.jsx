// Badge component for genre and rating tags
import { motion } from 'framer-motion';

export default function Badge({ children, color = 'neon-blue' }) {
    return (
        <motion.span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-full bg-${color} text-white`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {children}
        </motion.span>
    );
}
