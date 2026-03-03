export async function POST(req) {
    try {
        const { imdbId } = await req.json();
        if (!imdbId)
            return Response.json({ error: "IMDb ID required" }, { status: 400 });

        // 1️⃣ Convert IMDb → TMDB
        const findRes = await fetch(
            `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&api_key=${process.env.TMDB_API_KEY}`
        );
        const findData = await findRes.json();
        const movieTmdbId = findData.movie_results?.[0]?.id;
        if (!movieTmdbId)
            return Response.json({ error: "Movie not found" }, { status: 404 });

        // 2️⃣ Fetch Reviews
        const reviewsRes = await fetch(
            `https://api.themoviedb.org/3/movie/${movieTmdbId}/reviews?api_key=${process.env.TMDB_API_KEY}`
        );
        const reviewsData = await reviewsRes.json();
        const reviews = reviewsData.results?.slice(0, 5) || [];

        if (reviews.length === 0)
            return Response.json({ error: "No reviews found" }, { status: 404 });

        const reviewText = reviews
            .map((r, i) => `${i + 1}. ${r.content}`)
            .join("\n\n");

        // 3️⃣ STRICT Gemini Prompt
        const prompt = `
Analyze these audience reviews.

Return ONLY valid JSON.
Do NOT wrap in markdown.
Do NOT add explanation text.

JSON format:
{
  "overall_sentiment": "Positive | Mixed | Negative",
  "praised_aspects": ["..."],
  "criticized_aspects": ["..."],
  "summary": "Write 2 sentences summarizing overall audience opinion."
}

Reviews:
${reviewText}
`;

        const aiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 400,
                    },
                }),
            }
        );

        if (!aiRes.ok) {
            const errorText = await aiRes.text();
            return Response.json({ error: errorText }, { status: 500 });
        }

        const aiData = await aiRes.json();
        let raw = aiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        let audienceAnalysis;

        try {
            audienceAnalysis = JSON.parse(raw);
        } catch (err) {
            console.error("AI JSON Parse Failed:", raw);

            // 🔥 TEXT-BASED SENTIMENT FALLBACK (NOT rating-based)
            const combined = reviewText.toLowerCase();

            let sentiment = "Mixed";

            if (
                combined.includes("best") ||
                combined.includes("brilliant") ||
                combined.includes("amazing") ||
                combined.includes("must-watch")
            ) {
                sentiment = "Positive";
            } else if (
                combined.includes("worst") ||
                combined.includes("boring") ||
                combined.includes("overrated")
            ) {
                sentiment = "Negative";
            }

            audienceAnalysis = {
                overall_sentiment: sentiment,
                praised_aspects: [],
                criticized_aspects: [],
                summary: `Based on audience reviews, the overall response appears to be ${sentiment.toLowerCase()}. Viewers express their opinions clearly, reflecting the general tone found across the reviews.`,
            };
        }

        return Response.json({
            audience_analysis: audienceAnalysis,
            reviews: reviews.map((r) => ({
                author: r.author,
                content: r.content,
                rating: r.author_details?.rating ?? null,
            })),
        });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Failed to analyze audience" }, { status: 500 });
    }
}