# Troubleshooting Guide

## Common Signup/Login Errors and Solutions

### Error: "Failed to fetch" or Network Error on Signup

**Cause:** Database connection issue or API route error

**Solutions:**

1. **Check if MongoDB is running:**
   ```bash
   # Check MongoDB status
   # macOS/Linux:
   ps aux | grep mongod
   
   # Windows:
   tasklist | findstr mongod
   ```

2. **Start MongoDB if not running:**
   ```bash
   # macOS:
   brew services start mongodb-community
   
   # Linux:
   sudo systemctl start mongodb
   
   # Windows: Start MongoDB service from Services app
   ```

3. **Check browser console (F12) for specific error**

4. **Check terminal/server logs for error details**

###Error: OAuth (Google/GitHub) Not Working

**Cause:** OAuth credentials not configured

**Solution:**

OAuth providers won't show if credentials aren't set. This is NORMAL and EXPECTED!

**To enable OAuth:**

1. **For GitHub:**
   - Go to https://github.com/settings/developers
   - Create New OAuth App
   - Set callback URL: `http://localhost:3000/api/auth/callback/github`
   - Copy Client ID and Secret to `.env.local`

2. **For Google:**
   - Go to https://console.cloud.google.com
   - Create new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Set callback URL: `http://localhost:3000/api/auth/callback/google`
   - Copy Client ID and Secret to `.env.local`

**Alternative:** Just use email/password signup - it works without OAuth setup!

### Error: "Validation error" on Signup

**Cause:** Password doesn't meet requirements

**Requirements:**
- Minimum 6 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)

**Valid example:** `Test123` or `Password1`

### Error: "User with this email already exists"

**Cause:** Email already registered

**Solutions:**
1. Use different email
2. Try signing in instead
3. Use forgot password if you forgot your password
4. Clear database to start fresh (development only):
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Use your database
   use groupbuyingplatform
   
   # Delete all users
   db.users.deleteMany({})
   ```

### Error: "Invalid email or password" on Login

**Solutions:**
1. Double-check email and password
2. Ensure you completed signup successfully
3. Check if user exists in database:
   ```bash
   mongosh
   use groupbuyingplatform
   db.users.find({ email: "your-email@example.com" })
   ```

### Error: "Configuration" or "Server Error"

**Cause:** `.env.local` file missing or incorrect

**Solution:**

1. **Ensure `.env.local` exists in `groupbuyingplatform` folder**

2. **Minimum required variables:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/groupbuyingplatform
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=any-random-string-at-least-32-chars
   ```

3. **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

## Quick Diagnostic Commands

### Check MongoDB Connection

```bash
# Try connecting to MongoDB
mongosh mongodb://localhost:27017/groupbuyingplatform

# If successful, you should see MongoDB shell
# Type 'exit' to quit
```

### Check Environment Variables

```bash
# In project directory
cat .env.local

# Should show your environment variables
```

### Check if App is Running

```bash
# Check if port 3000 is in use
# macOS/Linux:
lsof -i :3000

# Windows:
netstat -ano | findstr :3000
```

### View Server Logs

When you run `npm run dev`, watch the terminal for errors like:
- `MongoDB connection error` - MongoDB not running
- `NEXTAUTH_SECRET` - Environment variable missing
- `500 Internal Server Error` - Check full error message

## Step-by-Step Test

### 1. Verify Environment

```bash
cd groupbuyingplatform
ls -la .env.local  # Should exist
cat .env.local     # Should have MONGODB_URI, NEXTAUTH_URL, NEXTAUTH_SECRET
```

### 2. Start MongoDB

```bash
# Start MongoDB service
mongod --version   # Check if MongoDB is installed
mongod            # Or start the service
```

### 3. Start Application

```bash
npm run dev
```

Watch for errors in terminal. Should see:
```
✅ MongoDB connected successfully
○ Compiling / ...
✓ Compiled / in XXXms
```

### 4. Test Signup

1. Go to http://localhost:3000/auth/signup
2. Open browser console (F12)
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123
   - Confirm: Test123
   - Role: User
   - Check terms
4. Click "Create account"
5. Watch for errors in:
   - Browser console (F12)
   - Terminal/server logs

### 5. Test Login

1. Go to http://localhost:3000/auth/signin
2. Enter credentials from signup
3. Click "Sign in"
4. Should redirect to `/dashboard`

## Common Environment Issues

### MongoDB URI Issues

**Wrong:**
```env
MONGODB_URI=localhost:27017
MONGODB_URI=27017
```

**Correct:**
```env
MONGODB_URI=mongodb://localhost:27017/groupbuyingplatform
# Or for Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/groupbuyingplatform
```

### NEXTAUTH_URL Issues

**Wrong:**
```env
NEXTAUTH_URL=localhost:3000
NEXTAUTH_URL=3000
```

**Correct:**
```env
NEXTAUTH_URL=http://localhost:3000
# Or for production:
NEXTAUTH_URL=https://yourdomain.com
```

## Still Not Working?

### Share These Details:

1. **Error message from browser console (F12):**
   - Take screenshot or copy full error

2. **Error from terminal/server logs:**
   - Copy the full error message

3. **Environment check:**
   ```bash
   # Run and share output:
   ls -la .env.local
   mongod --version
   node --version
   npm --version
   ```

4. **What happens when you click signup:**
   - Does button show "Creating account..."?
   - Does it show an error?
   - Does page reload?
   - What error message appears?

5. **Network request details:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Click signup
   - Click on the `/api/auth/register` request
   - Share the Response tab content

## Quick Fixes

### Can't install MongoDB?

Use MongoDB Atlas (free cloud database):
1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create free M0 cluster
4. Get connection string
5. Update `.env.local` with Atlas URI

### OAuth buttons not showing?

This is NORMAL! They only show if you've set up OAuth credentials in `.env.local`. You can use email/password signup instead.

### Want to skip database setup for now?

Unfortunately, the database is required for signup/login to work. But you can:
1. Use MongoDB Atlas (5 minutes setup, free)
2. Install MongoDB Compass (easiest local option)
3. Install MongoDB Community Server

The easiest option is MongoDB Compass - it's a simple install with a GUI!

