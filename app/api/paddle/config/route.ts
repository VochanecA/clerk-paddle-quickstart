import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.PADDLE_CLIENT_TOKEN;
  const priceId = process.env.PADDLE_PRICE_ID;
  const environment = process.env.PADDLE_ENV ?? 'sandbox';

  if (!token || !priceId) {
    return NextResponse.json({ error: 'Missing Paddle config' }, { status: 500 });
  }

  return NextResponse.json({
    token,
    priceId,
    environment
  });
}
