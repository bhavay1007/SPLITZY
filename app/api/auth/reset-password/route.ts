import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { resetPasswordSchema } from '@/lib/validations';
import { rateLimiter, getRateLimitHeaders, createRateLimitResponse } from '@/lib/rate-limit';
import crypto from 'crypto';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimiter(`reset-password:${ip}`)) {
      return createRateLimitResponse();
    }

    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();

    // Validate input
    const validatedData = resetPasswordSchema.parse(body);

    // Hash the token from URL
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(validatedData.token)
      .digest('hex');

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: new Date() },
    }).select('+password');

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired password reset token' },
        { status: 400 }
      );
    }

    // Update password
    user.password = validatedData.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Password reset successfully. You can now sign in with your new password.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Reset password error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An error occurred while resetting your password' },
      { status: 500 }
    );
  }
}

