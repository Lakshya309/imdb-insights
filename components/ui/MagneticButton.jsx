import { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
export default function MagneticButton() {
    const ref = useRef(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springX = useSpring(x, { stiffness: 150, damping: 15 })
    const springY = useSpring(y, { stiffness: 150, damping: 15 })

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) / 4)
        y.set((e.clientY - rect.top - rect.height / 2) / 4)
    }

    const reset = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            className="mt-6 px-6 py-2 bg-white text-black rounded-full shadow-lg hover:scale-105 transition"
            onClick={() =>
                document
                    .getElementById("search-section")
                    ?.scrollIntoView({ behavior: "smooth" })
            }
        >
            Search
        </motion.button>
    )
}