import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    return NextResponse.json({
      exists: !!existingUser,
      message: existingUser 
        ? 'This email is already registered' 
        : 'Email is available',
    });
  } catch (error) {
    console.error('Check email error:', error);
    return NextResponse.json(
      { error: 'Failed to check email', exists: false },
      { status: 500 }
    );
  }
}

