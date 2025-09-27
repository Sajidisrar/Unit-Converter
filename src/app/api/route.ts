import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // File path for storing messages
  const filePath = path.join(process.cwd(), 'messages.json');
  const existing = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    : [];

  existing.push({ name, email, message, date: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return NextResponse.json({ success: true });
}