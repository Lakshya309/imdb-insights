export async function POST(req) {
    try {
        const movie = await req.json();

        const prompt = `
You are a professional cinematic film analyst.
Analyze the following movie information and produce:
provide information that for which users is the movie suitable for in a marketting way 
1. CINEMATIC SUMMARY:
- 2–3 refined sentences
- Do not restate the plot
- Focus on atmosphere and cinematic essence
2. THEMATIC ANALYSIS:
- 5 sentences
- Explore themes and deeper meaning
3. EMOTIONAL TONE:
- One short expressive line
Important:
- Do NOT fabricate details.
- Use only provided information.
- Format with clear section headings.
- Do not use Markup
Movie Data:
Title: ${movie.primaryTitle}
Year: ${movie.startYear}
Genres: ${movie.genres}
Plot: ${movie.plot}
IMDb Rating: ${movie.rating}
`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: prompt }],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 600,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini API Error:", errText);
            return Response.json({ error: "Gemini API failed" }, { status: 500 });
        }

        const data = await response.json();

        const summary =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No summary generated.";

        return Response.json({ summary });

    } catch (error) {
        console.error("AI Summary Error:", error);
        return Response.json(
            { error: "Failed to generate summary" },
            { status: 500 }
        );
    }
}