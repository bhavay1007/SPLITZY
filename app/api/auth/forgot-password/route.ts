import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { forgotPasswordSchema } from '@/lib/validations';
import { sendEmail, generatePasswordResetEmail } from '@/lib/email';
import { rateLimiter, getRateLimitHeaders, createRateLimitResponse } from '@/lib/rate-limit';
import crypto from 'crypto';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimiter(`forgot-password:${ip}`)) {
      return createRateLimitResponse();
    }

    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();

    // Validate input
    const validatedData = forgotPasswordSchema.parse(body);

    // Find user by email
    const user = await User.findOne({ email: validatedData.email });

    // For security reasons, always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: 'If an account exists with this email, you will receive a password reset link.',
        },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set reset token and expiry (1 hour)
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Create reset link
    const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/reset-password?token=${resetToken}`;

    // Send email
    const emailHtml = generatePasswordResetEmail(user.name, resetLink);
    await sendEmail({
      to: user.email,
      subject: 'Reset Your Password - Splitzy',
      html: emailHtml,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Forgot password error:', error);

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
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

