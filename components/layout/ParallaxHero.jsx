"use client"

import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import MagneticButton from "../ui/MagneticButton"

export default function ParallaxHero() {
    const ref = useRef(null)
    const [movies, setMovies] = useState([])
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile screen
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const depth1 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const depth2 = useTransform(scrollYProgress, [0, 1], [0, -300])
    const depth3 = useTransform(scrollYProgress, [0, 1], [0, -450])

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
    const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

    // Desktop positions
    const desktopPositions = [
        { top: "8%", left: "5%" },
        { top: "18%", right: "8%" },
        { bottom: "15%", left: "5%" },
        { top: "30%", left: "25%" },
        { bottom: "15%", right: "18%" },
        { top: "12%", right: "32%" },
    ]

    // Mobile-friendly positions
    const mobilePositions = [
        { top: "5%", left: "10%" },
        { top: "20%", right: "10%" },
        { top: "35%", left: "15%" },
        { top: "50%", right: "15%" },
        { top: "65%", left: "10%" },
        { top: "80%", right: "10%" },
    ]

    useEffect(() => {
        fetch("/api/cult")
            .then((res) => res.json())
            .then((data) => setMovies(data))
    }, [])

    const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window
        mouseX.set((e.clientX - innerWidth / 2) / 40)
        mouseY.set((e.clientY - innerHeight / 2) / 40)
    }

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative h-[100vh] bg-black overflow-hidden"
        >
            {/* Floating Posters */}
            <div className="absolute inset-0 pointer-events-none">
                {movies
                    .filter((movie) => movie?.primaryImage?.url)
                    .map((movie, index) => {
                        const depths = [depth1, depth2, depth3]
                        const depth = depths[index % 3]
                        const position = isMobile
                            ? mobilePositions[index % mobilePositions.length]
                            : desktopPositions[index % desktopPositions.length]

                        return (
                            <motion.img
                                key={movie.id}
                                src={movie.primaryImage.url}
                                alt={movie.primaryTitle}
                                style={{
                                    ...position,
                                    y: depth,
                                    x: smoothX,
                                    rotateY: smoothX,
                                    rotateX: smoothY,
                                }}
                                className={`
                                    absolute 
                                    w-28 sm:w-32 md:w-44 lg:w-52 
                                    rounded-2xl shadow-2xl 
                                    will-change-transform
                                `}
                            />
                        )
                    })}
            </div>

            {/* Sticky Center Content */}
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <motion.div
                    className="relative z-10 text-center text-white px-4 sm:px-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mix-blend-screen font-light tracking-wide">
                        <p className="text-white italic">Explore</p>
                        <p className="text-white font-bold">Hidden</p>
                        <p className="text-white italic">Gems.</p>
                    </h1>

                    <div className="mt-6 sm:mt-8">
                        <MagneticButton />
                    </div>
                </motion.div>
            </div>
        </section>
    )
}