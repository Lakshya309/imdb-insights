import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const titleQuery = searchParams.get("title");

  const base = process.env.IMDB_API_BASE || "https://api.imdbapi.dev";

  try {
    // 🔹 Search by IMDb ID
    if (id) {
      if (!/^tt\d{7,9}$/.test(id)) {
        return NextResponse.json(
          { error: "Invalid IMDb ID format" },
          { status: 400 }
        );
      }

      const res = await fetch(`${base}/titles/${id}`);
      if (!res.ok) throw new Error("Movie not found");

      const data = await res.json();
      return NextResponse.json({ type: "single", data });
    }

    // 🔹 Search by Title
    if (titleQuery) {
      const res = await fetch(
        `${base}/search/titles?query=${encodeURIComponent(titleQuery)}`
      );

      if (!res.ok) throw new Error("Search failed");

      const data = await res.json();

      return NextResponse.json({
        type: "search",
        results: data?.titles?.slice(0, 8) || []
      });
    }

    return NextResponse.json(
      { error: "Provide either id or title" },
      { status: 400 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}