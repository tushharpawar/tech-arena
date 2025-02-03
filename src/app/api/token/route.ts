import { NextResponse } from 'next/server';
import { StreamChat } from 'stream-chat';

const serverClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!, process.env.STREAM_API_SECRET);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;  

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const token = serverClient.createToken(id);   
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Error generating Stream token:', error);
    return NextResponse.json({ error: 'Error generating token' }, { status: 500 });
  }
}