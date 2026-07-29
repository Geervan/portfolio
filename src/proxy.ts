import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>503: Maintenance</title>
  <style>
    :root {
      --bg: #ffffff;
      --fg: #000000;
      --subtle: #666666;
      --border: rgba(0, 0, 0, 0.15);
      --badge-bg: #f5f5f5;
      --badge-border: #e0e0e0;
      --badge-hover-bg: #eaeaea;
      --badge-hover-border: #999999;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #000000;
        --fg: #ffffff;
        --subtle: #888888;
        --border: rgba(255, 255, 255, 0.15);
        --badge-bg: #111111;
        --badge-border: #333333;
        --badge-hover-bg: #222222;
        --badge-hover-border: #666666;
      }
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: var(--bg);
      color: var(--fg);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 620px;
      width: 100%;
      text-align: left;
    }
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
    }
    .code {
      font-size: 24px;
      font-weight: 500;
      line-height: 49px;
      padding-right: 23px;
      border-right: 1px solid var(--border);
      margin-right: 20px;
    }
    .status-text {
      font-size: 14px;
      font-weight: 400;
      line-height: 49px;
    }
    .content {
      font-size: 14px;
      line-height: 1.7;
      color: var(--fg);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .content p {
      margin: 0;
    }
    .subtext {
      color: var(--subtle);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 10px;
      font-size: 13px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: var(--fg);
      background-color: var(--badge-bg);
      border: 1px solid var(--badge-border);
      border-radius: 6px;
      text-decoration: none;
      transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
      vertical-align: middle;
      white-space: nowrap;
    }
    .badge:hover {
      background-color: var(--badge-hover-bg);
      border-color: var(--badge-hover-border);
    }
    .badge svg {
      width: 14px;
      height: 14px;
      fill: currentColor;
    }
    .friends-container {
      margin-top: 8px;
      padding-top: 16px;
      border-top: 1px dashed var(--border);
    }
    .friends-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1 class="code">503</h1>
      <div class="status-text">Geervan's Portfolio under Maintenance.</div>
    </div>
    
    <div class="content">
      <p>
        If you&apos;re here looking for a portfolio, then lemme say shit happened and this had to be done as a result of nagging from a certain person {yep "A", happy now?}.
      </p>

      <p>
        If you&apos;re from GitHub, check out my <a href="https://linkedin.com/in/geervan" target="_blank" class="badge">
          <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/></svg>
          LinkedIn
        </a> and if you&apos;re from LinkedIn check out my <a href="https://github.com/geervan" target="_blank" class="badge">
          <svg viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
          GitHub
        </a>.
      </p>

      <p>
        Or if you wanna personally scream at my face or criticise any of my work <br> mail me at <a href="mailto:geervan99@gmail.com" class="badge">
          <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          geervan99@gmail.com
        </a>.
      </p>

      <p>
        And if after this you are curious about me as a potential hire, then here is my <a href="https://drive.google.com/file/d/15ZY23_drfZZg_D53kPNgkoKJc1A6PwNn/view?usp=sharing" target="_blank" class="badge">
          <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          Resume
        </a>.
      </p>

      <div class="friends-container">
        <p class="subtext">
          And if you didn&apos;t find me interesting no worries not the first person to feel this way i promise you, then ig you can check out my friends who are  super hireable:
        </p>
        <div class="friends-list">
          <a href="https://www.linkedin.com/in/aditi-kishore-729836320/" target="_blank" class="badge">
            <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/></svg>
            Aditi Kishore
          </a>
          <a href="https://www.instagram.com/virdas/" target="_blank" class="badge">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Vir Das
          </a>
          <a href="https://www.linkedin.com/in/26shivam/" target="_blank" class="badge">
            <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"/></svg>
            Shivam Gupta
          </a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, max-age=0",
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
