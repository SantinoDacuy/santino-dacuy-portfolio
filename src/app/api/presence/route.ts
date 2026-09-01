import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function POST(request: Request) {
  try {
    const { visitorId } = await request.json();

    if (!visitorId || typeof visitorId !== 'string') {
      return NextResponse.json({ error: 'visitorId is required and must be a string' }, { status: 400 });
    }

    // Add or update the visitor in the sorted set with the current timestamp as the score
    await redis.zadd('presence', {
      score: Date.now(),
      member: visitorId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating presence:', error);
    return NextResponse.json({ error: 'Failed to update presence' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const now = Date.now();
    const thirtySecondsAgo = now - 30000;

    // Remove members with a score (timestamp) older than 30 seconds
    await redis.zremrangebyscore('presence', 0, thirtySecondsAgo);

    // Count the remaining members (active visitors)
    const count = await redis.zcard('presence');

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting presence count:', error);
    return NextResponse.json({ error: 'Failed to get presence count' }, { status: 500 });
  }
}
