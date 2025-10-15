import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

export function rateLimiter(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  // Clean up old records
  if (record && record.resetTime < now) {
    rateLimit.delete(identifier);
  }

  const current = rateLimit.get(identifier);

  if (!current) {
    rateLimit.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (current.count >= MAX_REQUESTS) {
    return false;
  }

  current.count += 1;
  return true;
}

export function getRateLimitHeaders(identifier: string) {
  const record = rateLimit.get(identifier);
  if (!record) {
    return {
      'X-RateLimit-Limit': MAX_REQUESTS.toString(),
      'X-RateLimit-Remaining': MAX_REQUESTS.toString(),
      'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString(),
    };
  }

  const remaining = Math.max(0, MAX_REQUESTS - record.count);
  return {
    'X-RateLimit-Limit': MAX_REQUESTS.toString(),
    'X-RateLimit-Remaining': remaining.toString(),
    'X-RateLimit-Reset': new Date(record.resetTime).toISOString(),
  };
}

export function createRateLimitResponse() {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        'Retry-After': '60',
      },
    }
  );
}

