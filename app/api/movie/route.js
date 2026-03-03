import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // Basic validation
  if (!id || !/^tt\d{7,9}$/.test(id)) {
    return NextResponse.json(
      { error: "Invalid IMDb ID format" },
      { status: 400 }
    );
  }

  try {
    const base = process.env.IMDB_API_BASE || "https://api.imdbapi.dev";

    const titleRes = await fetch(`${base}/titles/${id}`);
    if (!titleRes.ok) throw new Error("Movie not found");

    const creditsRes = await fetch(`${base}/titles/${id}/credits`);
    const imagesRes = await fetch(`${base}/titles/${id}/images`);

    const titleData = await titleRes.json();
    const creditsData = creditsRes.ok ? await creditsRes.json() : {};
    const imagesData = imagesRes.ok ? await imagesRes.json() : {};

    return NextResponse.json({
      title: titleData,
      cast: creditsData?.cast?.slice(0, 8) || [],
      image: imagesData?.images?.[0]?.url || null
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movie data" },
      { status: 500 }
    );
  }
}