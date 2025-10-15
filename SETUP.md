# Setup Guide - Splitzy

## Quick Start

Follow these steps to get your authentication system up and running:

### Step 1: Install Dependencies

```bash
cd groupbuyingplatform
npm install
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB if not already installed
# macOS
brew install mongodb-community

# Windows - Download from mongodb.com

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Use it in your `.env.local` file

### Step 3: Create Environment File

Create `.env.local` in the `groupbuyingplatform` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/groupbuyingplatform
# Or for Atlas: mongodb+srv://username:password@cluster.mongodb.net/groupbuyingplatform

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-this-with-openssl-rand-base64-32

# Email (for password reset)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-gmail-app-password
EMAIL_FROM=noreply@splitzy.com

# Optional: OAuth (can skip for testing)
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Step 4: Generate Secret

```bash
# Run this command and copy the output
openssl rand -base64 32

# Paste it as NEXTAUTH_SECRET in .env.local
```

### Step 5: Setup Gmail (for forgot password feature)

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Factor Authentication**
3. Go to **Security** → **App Passwords**
4. Generate a new app password
5. Copy it to `EMAIL_SERVER_PASSWORD` in `.env.local`
6. Use your Gmail address for `EMAIL_SERVER_USER`

### Step 6: Run the Application

```bash
npm run dev
```

Visit: http://localhost:3000

## Testing the Application

### 1. Test Registration (User)

1. Navigate to http://localhost:3000/auth/signup
2. Fill in the form:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Password**: Test123 (must have uppercase, lowercase, number)
   - **Confirm Password**: Test123
   - **Account Type**: User
   - Check "I agree to terms"
3. Click "Create account"
4. You should see success message and redirect to signin

### 2. Test Registration (Admin)

Repeat the process but select "Admin" as Account Type

### 3. Test Login

1. Go to http://localhost:3000/auth/signin
2. Enter credentials:
   - **Email**: john@example.com
   - **Password**: Test123
3. Click "Sign in"
4. Should redirect to http://localhost:3000/dashboard

### 4. Test Dashboard Views

**User Dashboard:**
- Shows personal subscription groups
- Displays savings statistics
- Shows "Join Group" button

**Admin Dashboard:**
- Shows platform-wide statistics
- Displays recent users
- Shows total revenue and users

### 5. Test Profile Edit

1. Go to http://localhost:3000/profile
2. Click "Edit Profile"
3. Update:
   - Name
   - Phone (format: +1234567890)
   - Bio (max 500 chars)
   - Image URL (optional)
4. Click "Save Changes"
5. Should see success message

### 6. Test Forgot Password

1. Go to http://localhost:3000/auth/forgot-password
2. Enter registered email
3. Click "Send Reset Link"
4. Check your email inbox
5. Click the reset link
6. Enter new password (meets requirements)
7. Confirm new password
8. Click "Reset Password"
9. Login with new password

## Features Implemented

✅ **Registration**
- Front-end validation (real-time)
- Back-end validation (Zod)
- Password strength requirements
- Email uniqueness check
- User/Admin role selection

✅ **Login**
- Email/password authentication
- OAuth support (GitHub, Google)
- Session management (JWT)
- Protected routes

✅ **Forgot Password**
- Email verification
- Secure token generation (SHA-256)
- 1-hour expiration
- Password reset validation

✅ **Dashboard**
- Role-based views
- User stats (groups, savings)
- Admin stats (users, revenue)
- Responsive design

✅ **Profile Management**
- View profile
- Edit profile (name, email, phone, bio, image)
- Client-side validation
- Server-side validation
- Session update

✅ **Security**
- Password hashing (bcrypt)
- Rate limiting (5 requests/min)
- CSRF protection
- XSS prevention
- Secure tokens
- Email enumeration prevention

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Profile
- `GET /api/profile` - Get current user profile
- `PATCH /api/profile` - Update profile

## Validation Rules

### Password Requirements
- Minimum 6 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

### Email
- Valid email format
- Unique in database

### Name
- 2-50 characters
- Required

### Phone (Optional)
- International format: +1234567890
- Validates with regex

### Bio (Optional)
- Maximum 500 characters

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env.local`
- For Atlas: Check IP whitelist and credentials

### Issue: Email Not Sending
**Solution:**
- Use Gmail App Password (not regular password)
- Check EMAIL_SERVER_USER and EMAIL_SERVER_PASSWORD
- Verify port 587 is not blocked
- Check spam folder

### Issue: NextAuth Error
**Solution:**
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Issue: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Build errors
**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run dev
```

## File Structure Overview

```
groupbuyingplatform/
├── app/
│   ├── api/auth/          # Authentication APIs
│   ├── auth/              # Auth pages
│   ├── dashboard/         # User/Admin dashboard
│   └── profile/           # Profile management
├── lib/
│   ├── mongodb.ts         # DB connection
│   ├── validations.ts     # Zod schemas
│   ├── email.ts           # Email utilities
│   └── rate-limit.ts      # Rate limiting
├── models/
│   └── User.ts            # User model
└── types/
    └── next-auth.d.ts     # TypeScript definitions
```

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | Database connection string | `mongodb://localhost:27017/groupbuyingplatform` |
| NEXTAUTH_URL | Your application URL | `http://localhost:3000` |
| NEXTAUTH_SECRET | Secret for JWT signing | Generate with `openssl rand -base64 32` |
| EMAIL_SERVER_HOST | SMTP server host | `smtp.gmail.com` |
| EMAIL_SERVER_PORT | SMTP server port | `587` |
| EMAIL_SERVER_USER | Your email address | `your-email@gmail.com` |
| EMAIL_SERVER_PASSWORD | Email app password | Gmail app password |
| EMAIL_FROM | Sender email address | `noreply@groupsave.com` |

## Next Steps

1. ✅ Test all features locally
2. 🔄 Set up production database (MongoDB Atlas)
3. 🔄 Configure production email service
4. 🔄 Deploy to Vercel/Netlify
5. 🔄 Add custom domain
6. 🔄 Enable monitoring and logging

## Production Checklist

Before deploying to production:

- [ ] Use MongoDB Atlas or production database
- [ ] Generate new NEXTAUTH_SECRET
- [ ] Use environment variables on hosting platform
- [ ] Enable HTTPS
- [ ] Set up proper email service (SendGrid, AWS SES)
- [ ] Add rate limiting middleware
- [ ] Enable monitoring (Sentry, LogRocket)
- [ ] Set up backups
- [ ] Add logging
- [ ] Test all features in production

## Support

If you encounter any issues:

1. Check this setup guide
2. Review the main README.md
3. Check console for errors
4. Verify environment variables
5. Test database connection
6. Check email configuration

## Success Indicators

You'll know everything is working when:

✅ You can register a new user
✅ You can login successfully
✅ Dashboard loads with correct role view
✅ You can edit your profile
✅ Forgot password email arrives
✅ You can reset password and login

Congratulations! Your authentication system is ready! 🎉

