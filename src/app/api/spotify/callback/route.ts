import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error || !code) {
        return new NextResponse(
            `<html><body style="font-family:sans-serif;padding:2rem;"><h2>Authentication Failed</h2><p>${error || "No authorization code provided."}</p></body></html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    }

    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI || "http://127.0.0.1:3000/api/spotify/callback";

    if (!client_id || !client_secret) {
        return new NextResponse(
            `<html><body style="font-family:sans-serif;padding:2rem;"><h2>Missing Credentials</h2><p>Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local</p></body></html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    }

    try {
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri,
            }),
        });

        const data = await response.json();

        if (data.error || !data.refresh_token) {
            return new NextResponse(
                `<html><body style="font-family:sans-serif;padding:2rem;"><h2>Token Error</h2><pre>${JSON.stringify(data, null, 2)}</pre></body></html>`,
                { headers: { "Content-Type": "text/html" } }
            );
        }

        const refreshToken = data.refresh_token;

        return new NextResponse(
            `<!DOCTYPE html>
<html>
<head>
    <title>Spotify Token Generated</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #181818; color: #fff; padding: 3rem; text-align: center; }
        .box { background: #282828; max-width: 600px; margin: 0 auto; padding: 2rem; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
        .token { background: #121212; color: #1db954; padding: 1rem; border-radius: 6px; word-break: break-all; font-family: monospace; font-size: 0.95rem; margin: 1.5rem 0; border: 1px solid #333; text-align: left; }
        h1 { color: #1db954; font-size: 1.8rem; margin-bottom: 0.5rem; }
        p { color: #b3b3b3; line-height: 1.6; }
        .btn { background: #1db954; color: #000; font-weight: bold; border: none; padding: 0.8rem 1.5rem; border-radius: 30px; cursor: pointer; font-size: 1rem; transition: transform 0.2s; }
        .btn:hover { transform: scale(1.05); }
    </style>
</head>
<body>
    <div class="box">
        <h1>Spotify Connected Successfully!</h1>
        <p>Copy your <strong>SPOTIFY_REFRESH_TOKEN</strong> below and paste it into your <code>.env.local</code> file:</p>
        
        <div class="token" id="tokenBox">SPOTIFY_REFRESH_TOKEN=${refreshToken}</div>
        
        <button class="btn" onclick="copyToken()">Copy Refresh Token</button>
        <p id="msg" style="margin-top: 1rem; color: #1db954; font-weight: bold; display: none;">Copied to clipboard!</p>
    </div>

    <script>
        function copyToken() {
            navigator.clipboard.writeText('SPOTIFY_REFRESH_TOKEN=${refreshToken}');
            document.getElementById('msg').style.display = 'block';
        }
    </script>
</body>
</html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    } catch (err: any) {
        return new NextResponse(
            `<html><body style="font-family:sans-serif;padding:2rem;"><h2>Server Error</h2><p>${err.message}</p></body></html>`,
            { headers: { "Content-Type": "text/html" } }
        );
    }
}
