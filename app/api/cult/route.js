export async function GET() {
    const ids = [
        "tt0068646",
        "tt0110912",
        "tt0076759",
        "tt0109830",
        "tt0080684",
        "tt0114369",
    ]

    const base = process.env.IMDB_API_BASE

    try {
        const results = await Promise.all(
            ids.map(async (id) => {
                const res = await fetch(`${base}/titles/${id}`)

                if (!res.ok) return null

                return res.json()
            })
        )

        return Response.json(results.filter(Boolean))
    } catch (err) {
        console.error(err)
        return Response.json(
            { error: "Fetch failed" },
            { status: 500 }
        )
    }
}