"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// -------------------- Typing Animation --------------------
function TypingText({ text }) {
    const [displayed, setDisplayed] = useState("");
    useEffect(() => {
        setDisplayed("");
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(interval);
        }, 15);
        return () => clearInterval(interval);
    }, [text]);
    return <p className="text-slate-700 whitespace-pre-line text-base md:text-lg">{displayed}</p>;
}

// -------------------- Audience Insights Component --------------------
export default function AudienceInsights({ imdbId }) {
    const [audienceAnalysis, setAudienceAnalysis] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!imdbId) return;
        fetchAudienceInsights();
    }, [imdbId]);

    async function fetchAudienceInsights() {
        setLoading(true);
        setAudienceAnalysis(null);
        setReviews([]);

        try {
            const res = await fetch("/api/audience-analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imdbId }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setAudienceAnalysis(data.audience_analysis);
            setReviews(data.reviews || []);
        } catch (err) {
            console.error("Audience Analysis Error:", err);
            setAudienceAnalysis({
                overall_sentiment: "Mixed",
                praised_aspects: [],
                criticized_aspects: [],
                summary: "Failed to generate audience insights.",
            });
        }

        setLoading(false);
    }

    const sentimentColor = {
        Positive: "bg-green-100 text-green-800",
        Mixed: "bg-yellow-100 text-yellow-800",
        Negative: "bg-red-100 text-red-800",
        Unknown: "bg-slate-100 text-slate-800",
    };

    return (
        <div className="mt-8">
            {/* AI Summary + Sentiment */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-2xl p-6 shadow-lg mb-6"
            >
                {loading ? (
                    <div className="animate-pulse space-y-2">
                        <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-5 bg-slate-200 rounded w-full"></div>
                        <div className="h-5 bg-slate-200 rounded w-5/6"></div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-semibold text-slate-900">Audience Insights</h3>
                            <span
                                className={`px-3 py-1 rounded-full font-medium text-sm ${sentimentColor[audienceAnalysis?.overall_sentiment || "Unknown"]
                                    }`}
                            >
                                {audienceAnalysis?.overall_sentiment || "Unknown"}
                            </span>
                        </div>
                        {audienceAnalysis?.summary && <TypingText text={audienceAnalysis.summary} />}
                    </>
                )}
            </motion.div>

            {/* Praised & Criticized Tags */}
            {!loading && audienceAnalysis && (
                <div className="flex flex-wrap gap-3 mb-6">
                    {audienceAnalysis.praised_aspects?.map((item, i) => (
                        <span key={`p${i}`} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {item}
                        </span>
                    ))}
                    {audienceAnalysis.criticized_aspects?.map((item, i) => (
                        <span key={`c${i}`} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                            {item}
                        </span>
                    ))}
                </div>
            )}

            {/* Reviews */}
            <div className="grid gap-4 md:grid-cols-2">
                {reviews.map((review, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
                    >
                        <p className="text-slate-900 font-semibold">{review.author}</p>
                        {review.rating != null && <p className="text-sm text-yellow-500 mb-2">⭐ {review.rating}</p>}
                        <p className="text-slate-700">{review.content}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}