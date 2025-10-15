# 🚀 SETUP INSTRUCTIONS - READ THIS FIRST!

## ⚠️ Current Issues Found:

1. ✅ **FIXED**: `.env.local` was missing `MONGODB_URI` - Now added!
2. ❌ **MongoDB is not installed** - This is why signup/login fails

## 🎯 Quick Fix - Choose ONE Option:

### Option 1: MongoDB Atlas (Cloud - EASIEST, 5 minutes) ⭐ RECOMMENDED

**No installation needed! Free tier available!**

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** (free)
3. **Create a cluster:**
   - Choose "M0 Free" tier
   - Choose cloud provider (AWS recommended)
   - Choose region closest to you
   - Click "Create"

4. **Create database user:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `groupbuy`
   - Password: Create a strong password (save it!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

5. **Whitelist your IP:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

6. **Get connection string:**
   - Go back to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://groupbuy:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password

7. **Update `.env.local`:**
   ```env
   MONGODB_URI=mongodb+srv://groupbuy:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/groupbuyingplatform?retryWrites=true&w=majority
   ```

8. **Restart your app:**
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

9. **Test signup!** Go to http://localhost:3000/auth/signup

---

### Option 2: Install MongoDB Locally (Windows)

**Takes 10-15 minutes, but works offline**

1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Version: 7.0 (or latest)
   - Platform: Windows
   - Package: MSI
   - Click "Download"

2. **Install MongoDB:**
   - Run the downloaded `.msi` file
   - Choose "Complete" installation
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Check "Install MongoDB Compass" (GUI tool)
   - Click "Install"

3. **Verify installation:**
   ```bash
   # Open new terminal/PowerShell
   mongod --version
   # Should show version number
   ```

4. **MongoDB should auto-start as a service**
   - If not, run: `net start MongoDB`

5. **Your `.env.local` is already configured!**
   ```env
   MONGODB_URI=mongodb://localhost:27017/groupbuyingplatform
   ```

6. **Restart your app:**
   ```bash
   npm run dev
   ```

7. **Test signup!** Go to http://localhost:3000/auth/signup

---

### Option 3: Use MongoDB Compass (GUI - EASIEST for Windows)

**Easiest local option with GUI!**

1. **Download Compass:**
   - Go to: https://www.mongodb.com/try/download/compass
   - Download and install

2. **Open Compass:**
   - Click "Connect" (will connect to localhost)
   - MongoDB starts automatically!

3. **Your `.env.local` is configured:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/groupbuyingplatform
   ```

4. **Restart app:**
   ```bash
   npm run dev
   ```

---

## ✅ After Setup - Test Your App:

### 1. Start the app:
```bash
npm run dev
```

You should see in terminal:
```
✅ MongoDB connected successfully
✓ Ready in XXXms
```

### 2. Test Signup:

1. Go to: http://localhost:3000/auth/signup
2. Fill in:
   - **Name:** Test User
   - **Email:** test@example.com
   - **Password:** Test123 (must have uppercase, lowercase, number)
   - **Confirm Password:** Test123
   - **Account Type:** User
   - ✅ Check "I agree to terms"
3. Click "Create account"
4. Should see: "Account created successfully! Please sign in."

### 3. Test Login:

1. Go to: http://localhost:3000/auth/signin
2. Enter:
   - **Email:** test@example.com
   - **Password:** Test123
3. Click "Sign in"
4. Should redirect to Dashboard!

---

## 🔍 About OAuth (Google/GitHub):

Your GitHub OAuth is already configured! Google is not set up yet.

**GitHub Sign In:**
- Should work automatically
- Click "Continue with GitHub" on signin page

**Google Sign In:**
- Not configured yet (that's ok!)
- You can skip this and use email/password
- Or set it up later following instructions in README.md

---

## ❓ Still Having Issues?

### Check These:

1. **MongoDB Connection:**
   - If using Atlas: Check if IP is whitelisted
   - If using local: Check if MongoDB service is running

2. **Browser Console:**
   - Press F12
   - Go to Console tab
   - Look for errors when clicking signup

3. **Server Terminal:**
   - Look for error messages
   - Should see "✅ MongoDB connected successfully"

4. **Common Errors:**
   - "MongoDB connection error" → MongoDB not running/configured
   - "User already exists" → Use different email or sign in instead
   - "Validation error" → Check password requirements

---

## 📊 Current Status:

✅ Environment variables configured  
✅ GitHub OAuth configured  
✅ App code ready  
❌ MongoDB needs setup (choose option above)  
⚠️ Google OAuth not configured (optional)  
⚠️ Email not configured (optional, for forgot password)

---

## 🎯 Recommended: Use MongoDB Atlas

**Why?**
- ✅ No installation needed
- ✅ Works immediately
- ✅ Free tier available
- ✅ Cloud backup included
- ✅ Works from anywhere

**Setup time:** ~5 minutes

---

## 🆘 Need Help?

Share these details:
1. Which option you chose (Atlas, Local, or Compass)
2. Error message from browser (F12 console)
3. Error message from terminal
4. Screenshot of the issue

I'll help you debug it!

