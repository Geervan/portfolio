import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Types for the guestbook entries
interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  color: 'yellow' | 'blue' | 'pink' | 'green';
  font?: 'patrick' | 'caveat' | 'indie' | 'marker';
  createdAt: string;
}

// In-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 30 * 1000; // 30 sec limit

// Path to the local JSON storage file
const dbPath = path.join(process.cwd(), 'src/data/guestbook.json');

// Helper to get client IP
function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || 'unknown-ip';
}

// Helper to read entries from the active storage
async function readEntries(): Promise<GuestbookEntry[]> {
  // 1. Try Supabase if configured
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    try {
      const url = `${process.env.SUPABASE_URL}/rest/v1/guestbook?select=*&order=createdAt.desc`;
      const res = await fetch(url, {
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('Supabase read error:', err);
    }
  }

  // 2. Try Vercel KV if configured
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const url = `${process.env.KV_REST_API_URL}/get/guestbook_entries`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        },
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        if (json.result) {
          let parsed = JSON.parse(json.result);
          if (typeof parsed === 'string') {
            parsed = JSON.parse(parsed);
          }
          return Array.isArray(parsed) ? parsed : [];
        }
      }
    } catch (err) {
      console.error('Vercel KV read error:', err);
    }
  }

  // 3. Fallback to local JSON file (Default for local development)
  try {
    const fileContent = await fs.readFile(dbPath, 'utf-8');
    const parsed = JSON.parse(fileContent);
    // Return sorted recent first
    return Array.isArray(parsed) ? parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : [];
  } catch (err) {
    console.warn('Local file read failed, returning empty list:', err);
    return [];
  }
}

// Helper to write entries to the active storage
async function writeEntries(entries: GuestbookEntry[]): Promise<boolean> {
  // 1. Try Supabase if configured
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    // Note: In Supabase we insert single rows, but here we can support full write upsert if needed,
    // or just let the POST handler handle single inserts.
    // For general compatibility, we will handle single inserts directly in POST.
    // But we'll keep this helper returning true if Supabase is active.
    return true;
  }

  // 2. Try Vercel KV if configured
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const url = `${process.env.KV_REST_API_URL}/set/guestbook_entries`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entries),
      });
      return res.ok;
    } catch (err) {
      console.error('Vercel KV write error:', err);
      return false;
    }
  }

  // 3. Fallback to local JSON file
  try {
    await fs.writeFile(dbPath, JSON.stringify(entries, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Local file write failed:', err);
    return false;
  }
}

// GET handler - retrieve entries
export async function GET() {
  try {
    const entries = await readEntries();
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load guestbook entries' }, { status: 500 });
  }
}

// POST handler - create an entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, color, font, honeypot } = body;

    // 1. Honeypot check for bots
    if (honeypot) {
      console.warn('Bot detected via honeypot field submission');
      // Silently return success to confuse bot scripts
      return NextResponse.json({ success: true, message: 'Message pinned!' });
    }

    // 2. Rate limiting check
    const ip = getClientIp(request);
    const lastSubTime = rateLimitMap.get(ip);
    const now = Date.now();
    if (lastSubTime && now - lastSubTime < RATE_LIMIT_MS) {
      const remainingSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubTime)) / 1000);
      return NextResponse.json(
        { error: `Whoa there, writer! Please wait ${remainingSeconds}s before pinning another note.` },
        { status: 429 }
      );
    }

    // 3. Input Validation
    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    const cleanMessage = message.trim().slice(0, 150); // limit to 150 chars
    const cleanName = name && name.trim() !== '' ? name.trim().slice(0, 25) : 'Anonymous';
    const cleanColor = ['yellow', 'blue', 'pink', 'green'].includes(color) ? color : 'yellow';
    const cleanFont = ['patrick', 'caveat', 'indie', 'marker'].includes(font) ? font : 'patrick';

    const newEntry: GuestbookEntry = {
      id: crypto.randomUUID(),
      name: cleanName,
      message: cleanMessage,
      color: cleanColor as GuestbookEntry['color'],
      font: cleanFont as GuestbookEntry['font'],
      createdAt: new Date().toISOString(),
    };

    // 4. Save entry
    // Check if Supabase is active
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      const url = `${process.env.SUPABASE_URL}/rest/v1/guestbook`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) {
        throw new Error(`Supabase insert failed: ${await res.text()}`);
      }
    } else {
      // Fallback/KV: read existing array, add new entry, and save
      const currentEntries = await readEntries();
      const updatedEntries = [newEntry, ...currentEntries];
      const writeSuccess = await writeEntries(updatedEntries);
      if (!writeSuccess) {
        throw new Error('Storage write failed');
      }
    }

    // Set last submission timestamp for rate limit
    rateLimitMap.set(ip, now);

    return NextResponse.json({ success: true, entry: newEntry });
  } catch (error) {
    console.error('Guestbook POST error:', error);
    return NextResponse.json({ error: 'Failed to submit guestbook entry.' }, { status: 500 });
  }
}

// DELETE handler - delete an entry
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, password } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing entry ID' }, { status: 400 });
    }

    // Verify Admin Password (fallback to 'admin' in development if no env variable is defined)
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';
    if (!process.env.ADMIN_PASSWORD) {
      console.warn('WARNING: ADMIN_PASSWORD environment variable is not defined. Defaulting to password "admin" for local testing.');
    }

    if (password !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized: Incorrect admin password.' }, { status: 401 });
    }

    // Delete logic
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      const url = `${process.env.SUPABASE_URL}/rest/v1/guestbook?id=eq.${id}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Supabase delete failed: ${await res.text()}`);
      }
    } else {
      // Fallback/KV: read, filter, write
      const currentEntries = await readEntries();
      const updatedEntries = currentEntries.filter(entry => entry.id !== id);
      const writeSuccess = await writeEntries(updatedEntries);
      if (!writeSuccess) {
        throw new Error('Storage write failed during deletion');
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Guestbook DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete guestbook entry.' }, { status: 500 });
  }
}
