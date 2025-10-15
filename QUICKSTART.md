# Quick Start Guide - For Testing

## Immediate Testing (Without MongoDB or Email Setup)

If you want to test the UI without database setup:

### Step 1: Create Minimal Environment File

Create `.env.local`:

```env
# Minimal configuration for UI testing
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test-secret-key-for-development-only

# MongoDB - Optional for UI testing
MONGODB_URI=mongodb://localhost:27017/groupbuyingplatform

# Email - Optional for UI testing  
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=noreply@example.com
```

### Step 2: Run the Application

```bash
npm run dev
```

### Step 3: Test the UI

Visit these pages to test the UI:
- http://localhost:3000/auth/signin - Login page
- http://localhost:3000/auth/signup - Registration page
- http://localhost:3000/auth/forgot-password - Forgot password page

## Full Setup (With Database and Email)

### Option 1: Quick MongoDB Setup

**Using MongoDB Atlas (Cloud - Free):**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster (M0 Free tier)
4. Create database user
5. Get connection string
6. Update `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/groupbuyingplatform
   ```

**Using Local MongoDB:**

```bash
# Install MongoDB
# macOS:
brew install mongodb-community
brew services start mongodb-community

# Windows: Download from mongodb.com and start service

# Linux:
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Option 2: Gmail Setup for Emails

1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate new app password
5. Update `.env.local`:
   ```env
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-16-digit-app-password
   ```

## Common Issues & Quick Fixes

### Issue: "MongoDB connection failed"

**Quick Fix 1 - Comment out database connection:**

Edit `groupbuyingplatform/lib/mongodb.ts`:

```typescript
async function connectDB() {
  console.log('⚠️ MongoDB connection skipped for testing');
  return null; // Temporarily skip for UI testing
  
  // ... rest of code
}
```

**Quick Fix 2 - Use MongoDB Atlas (see above)**

### Issue: "Email not sending"

**Quick Fix - Mock email sending:**

Edit `groupbuyingplatform/lib/email.ts`:

```typescript
export async function sendEmail({ to, subject, html }: EmailOptions) {
  // For testing, just log the email
  console.log('📧 Email would be sent to:', to);
  console.log('Subject:', subject);
  console.log('Reset link would be in the email');
  return { success: true, messageId: 'test-message-id' };
  
  // ... rest of code
}
```

### Issue: OAuth (Google/GitHub) not working

**This is normal!** OAuth requires:

1. Create OAuth app on GitHub/Google
2. Get client ID and secret
3. Add to `.env.local`

**For now:** Just use email/password login!

## Testing Without Database

To test the UI without setting up MongoDB:

### 1. Create Test Version of Registration API

Create `groupbuyingplatform/app/api/auth/register/route-test.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Just return success for testing
    console.log('Would register user:', body.email);
    
    return NextResponse.json({
      success: true,
      message: 'User registered successfully (TEST MODE)',
      user: {
        id: 'test-id',
        name: body.name,
        email: body.email,
        role: body.role,
      },
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
```

### 2. Test Individual Pages

Each page can be viewed without backend:
- `/auth/signin` - See login form
- `/auth/signup` - See registration form with validation
- `/auth/forgot-password` - See forgot password form
- `/dashboard` - Will redirect if not logged in
- `/profile` - Will redirect if not logged in

## Minimal Working Setup

### Just Want to See It Work?

1. **Create `.env.local`:**
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=any-random-string-here
   MONGODB_URI=mongodb://localhost:27017/test
   ```

2. **Install MongoDB Compass** (Easy GUI):
   - Download from: https://www.mongodb.com/try/download/compass
   - Install and open
   - Click "Connect" (default localhost connection)
   - Done! MongoDB is running

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Register a user:**
   - Go to http://localhost:3000/auth/signup
   - Fill form with:
     - Name: Test User
     - Email: test@test.com
     - Password: Test123
     - Confirm: Test123
     - Role: User
   - Check terms
   - Click "Create account"

5. **Login:**
   - Use email: test@test.com
   - Password: Test123
   - You should see the dashboard!

## What Works Without Full Setup?

✅ Can view all pages and UI
✅ Client-side validation works
✅ Form interactions work
✅ UI components work
❌ Cannot actually register (needs MongoDB)
❌ Cannot login (needs MongoDB)
❌ Cannot reset password (needs MongoDB + Email)
❌ OAuth won't work (needs OAuth setup)

## Recommended Quick Start

For fastest testing:

1. Install MongoDB Compass (easiest)
2. Create `.env.local` with minimal config
3. Run `npm run dev`
4. Register and login!

Skip email setup initially - you can add that later when needed.

## Still Having Issues?

Check the browser console (F12) and terminal for error messages. Share those errors and I can help fix them specifically!

