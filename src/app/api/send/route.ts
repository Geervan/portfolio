import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [process.env.RESEND_TO_EMAIL || 'geervan99@gmail.com'],
            replyTo: email,
            subject: `New Message from ${name} (Portfolio)`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
