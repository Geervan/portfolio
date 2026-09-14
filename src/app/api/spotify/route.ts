import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

function getEnvVar(name: string): string | undefined {
    let val = process.env[name];
    if (!val) {
        try {
            const envPath = path.join(process.cwd(), ".env.local");
            if (fs.existsSync(envPath)) {
                const content = fs.readFileSync(envPath, "utf-8");
                for (const line of content.split("\n")) {
                    const trimmed = line.trim();
                    if (trimmed.startsWith(`${name}=`)) {
                        val = trimmed.slice(`${name}=`.length).trim();
                        break;
                    }
                }
            }
        } catch {
            // ignore
        }
    }

    if (val) {
        val = val.replace(/^["']|["']$/g, "").trim();
        if (name === "SPOTIFY_REFRESH_TOKEN" && val.startsWith("SPOTIFY_REFRESH_TOKEN=")) {
            val = val.replace("SPOTIFY_REFRESH_TOKEN=", "").trim();
        }
    }
    return val;
}

async function getAccessToken() {
    const client_id = getEnvVar("SPOTIFY_CLIENT_ID");
    const client_secret = getEnvVar("SPOTIFY_CLIENT_SECRET");
    const refresh_token = getEnvVar("SPOTIFY_REFRESH_TOKEN");

    if (!client_id || !client_secret || !refresh_token) {
        return null;
    }

    try {
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
        const response = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token,
            }),
            cache: "no-store",
        });

        const data = await response.json();
        return data.access_token;
    } catch {
        return null;
    }
}

export async function GET() {
    const access_token = await getAccessToken();

    if (!access_token) {
        return NextResponse.json({
            isPlaying: false,
            title: "Starboy",
            artist: "The Weeknd",
            songUrl: "https://open.spotify.com",
            isConfigured: false,
        });
    }

    try {
        // 1. Try currently playing
        const res = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            cache: "no-store",
        });

        if (res.status === 200) {
            const song = await res.json();

            if (song && song.item) {
                const title = song.item.name;
                const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
                const songUrl = song.item.external_urls.spotify;
                const albumArt = song.item.album?.images?.[0]?.url;

                return NextResponse.json({
                    isPlaying: Boolean(song.is_playing),
                    title,
                    artist,
                    songUrl,
                    albumArt,
                    isConfigured: true,
                });
            }
        }


        // 2. If nothing currently playing, fetch recently played
        const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            cache: "no-store",
        });

        if (recentRes.status === 200) {
            const recent = await recentRes.json();
            if (recent.items && recent.items.length > 0) {
                const track = recent.items[0].track;
                return NextResponse.json({
                    isPlaying: false,
                    title: track.name,
                    artist: track.artists.map((_artist: any) => _artist.name).join(", "),
                    songUrl: track.external_urls.spotify,
                    albumArt: track.album.images[0]?.url,
                    isConfigured: true,
                });
            }
        }

        return NextResponse.json({
            isPlaying: false,
            title: "Offline",
            artist: "Spotify",
            songUrl: "https://open.spotify.com",
            isConfigured: true,
        });
    } catch {
        return NextResponse.json({
            isPlaying: false,
            title: "Starboy",
            artist: "The Weeknd",
            songUrl: "https://open.spotify.com",
            isConfigured: true,
        });
    }
}
