import { NextResponse } from "next/server";

export async function GET() {
    const client_id = process.env.SPOTIFY_CLIENT_ID;

    if (!client_id) {
        return NextResponse.json(
            { error: "SPOTIFY_CLIENT_ID is missing in .env.local" },
            { status: 400 }
        );
    }

    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI || "http://127.0.0.1:3000/api/spotify/callback";
    const scope = "user-read-currently-playing user-read-recently-played";

    const params = new URLSearchParams({
        response_type: "code",
        client_id,
        scope,
        redirect_uri,
    });

    return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}


