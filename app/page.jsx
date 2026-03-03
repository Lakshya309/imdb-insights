"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import ParallaxHero from "@/components/layout/ParallaxHero"
import SearchSection from "@/components/layout/SearchSection"
import SearchResultsGrid from "@/components/layout/SearchResultsGrid"
import MovieDetailsCard from "@/components/layout/MovieDetailsCard"
import Loader from "@/components/ui/Loader"
import ErrorState from "@/components/ui/ErrorState"
import EmptyState from "@/components/ui/EmptyState"
import Footer from "@/components/layout/Footer"

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchMovie = async (mode, query) => {
    setLoading(true)
    setData(null)

    const url =
      mode === "id"
        ? `/api/movie?id=${query}`
        : `/api/movie?title=${query}`

    try {
      const res = await fetch(url)
      const result = await res.json()
      setData(result)
    } catch {
      setData({ error: "Something went wrong." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative w-full min-h-screen bg-white text-slate-900 overflow-hidden">

      {/* HERO */}
      <ParallaxHero />

      {/* CONTENT SECTION */}
      <section
        id="search-section"
        className="relative z-10 bg-gradient-to-b from-white via-slate-50 to-white py-24 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto">

          {/* Search */}
          <SearchSection onSearch={fetchMovie} loading={loading} />

          {/* Results */}
          <div className="mt-16">
            <AnimatePresence mode="wait">

              {loading && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center py-20"
                >
                  <Loader />
                </motion.div>
              )}

              {!loading && data?.error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <ErrorState message={data.error} />
                </motion.div>
              )}

              {!loading && data?.type === "single" && (
                <motion.div
                  key="single"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <MovieDetailsCard data={data} />
                </motion.div>
              )}

              {!loading && data?.type === "search" && (
                <motion.div
                  key="search"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SearchResultsGrid
                    results={data.results}
                    onSelect={fetchMovie}
                  />
                </motion.div>
              )}

              {!loading && !data && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                >
                  <EmptyState
                    title="Start exploring cinema"
                    description="Search any IMDb ID or movie title above."
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}