# 🚀 QUICK FIX CHECKLIST

## ⚡ 3 Critical Issues to Fix (10 minutes total):

---

## ☑️ Issue 1: Port Mismatch (ALREADY FIXED ✅)

**Problem:** App runs on port 3001, but .env said 3000
**Status:** ✅ I already updated your `.env.local` to port 3001

---

## ☑️ Issue 2: GitHub OAuth Callback URL (YOU MUST DO THIS)

**Problem:** GitHub OAuth expects port 3000, but app is on 3001

### Fix in 2 minutes:

1. Open: https://github.com/settings/developers
2. Click your OAuth app
3. Change:
   - **Homepage URL:** `http://localhost:3001`
   - **Callback URL:** `http://localhost:3001/api/auth/callback/github`
4. Click "Update application"

**After this:** GitHub login will auto-create user account (no signup needed!)

---

## ☑️ Issue 3: MongoDB Not Connected (CAUSES SIGNUP ERRORS)

**Problem:** No MongoDB = signup fails

### Quick Fix - MongoDB Atlas (5 minutes):

#### Step 1: Create Account
- Go to: https://www.mongodb.com/cloud/atlas/register
- Sign up (free)

#### Step 2: Create Cluster
- Choose "M0 FREE" tier
- Select AWS and any region
- Click "Create"
- **Wait 2 minutes**

#### Step 3: Create User
- Username: `admin`
- Password: `Admin123`
- Permission: "Read and write to any database"

#### Step 4: Allow Access
- Go to "Network Access"
- Click "Allow Access from Anywhere"

#### Step 5: Get Connection String
- Go to Database → Connect → Drivers
- Copy string, it looks like:
  ```
  mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

#### Step 6: Update Connection String
Replace `<password>` with `Admin123` and add `/groupbuyingplatform`:
```
mongodb+srv://admin:Admin123@cluster0.xxxxx.mongodb.net/groupbuyingplatform?retryWrites=true&w=majority
```

#### Step 7: Update .env.local
Open `groupbuyingplatform/.env.local` and replace the MONGODB_URI line with your Atlas string.

#### Step 8: Restart App
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

You should see: `✅ MongoDB connected successfully`

---

## 🧪 After Fixing - Test Results:

### ✅ GitHub OAuth Login (No signup needed!)

1. Go to: http://localhost:3001/auth/signin
2. Click "Continue with GitHub"
3. **Authorize on GitHub** (first time only)
4. **Automatically creates account and logs you in!**
5. **No need to signup separately!**

**How it works:**
- GitHub provides: name, email, profile picture
- App auto-creates user account
- Logs you in immediately
- You're in the dashboard!

### ✅ Email/Password Signup

1. Go to: http://localhost:3001/auth/signup
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123
   - Confirm: Test123
   - Role: User
3. Click "Create account"
4. **Success!** Redirects to signin
5. Login with same credentials

---

## 📊 Current Status:

| Item | Status |
|------|--------|
| Port configuration | ✅ Fixed (3001) |
| GitHub callback URL | ❌ You must update |
| MongoDB connection | ❌ You must setup |
| GitHub auto-signup | ✅ Code ready (works after fixes) |
| Email signup | ✅ Code ready (works after MongoDB) |

---

## 🎯 What Happens After You Fix:

### GitHub OAuth Flow:
```
User clicks "Continue with GitHub"
   ↓
Redirects to GitHub
   ↓
User authorizes app
   ↓
GitHub sends user info back
   ↓
App checks if user exists in database
   ↓
If NO → Auto-creates account
   ↓
Logs user in
   ↓
Dashboard!
```

**No signup form needed!** It's automatic!

### Email/Password Flow:
```
User fills signup form
   ↓
Validates password (6+ chars, uppercase, lowercase, number)
   ↓
Checks email not already used
   ↓
Creates account in MongoDB
   ↓
Redirects to signin
   ↓
User logs in
   ↓
Dashboard!
```

---

## 🚨 Important Notes:

### For GitHub OAuth:
- ✅ Callback URL MUST match port (3001)
- ✅ Auto-creates account on first login
- ✅ Saves: name, email, profile picture from GitHub
- ✅ Role: automatically set to "user"
- ✅ No password needed (OAuth handles it)

### For Email Signup:
- ✅ Password must meet requirements
- ✅ Email must be unique
- ✅ Can choose User or Admin role
- ✅ Must accept terms

---

## 🔍 How to Verify It's Working:

### Terminal should show:
```
✅ MongoDB connected successfully
✓ Ready in Xs
Local: http://localhost:3001
```

### When you signup:
- Should see success message
- Redirects to signin page
- No errors in browser console (F12)

### When you use GitHub OAuth:
- Redirects to GitHub
- Returns to app
- Shows dashboard immediately
- No "signup" step needed!

---

## ⏱️ Time Breakdown:

- GitHub callback update: **2 minutes**
- MongoDB Atlas setup: **5 minutes**
- Testing: **3 minutes**
- **Total: 10 minutes**

---

## 🆘 Still Not Working?

**Take a screenshot showing:**
1. The error message
2. Your terminal output
3. Browser console (F12)

**And answer:**
- Which step did you complete? (GitHub callback? MongoDB?)
- What error do you see?
- Which method are you testing? (GitHub OAuth or email signup?)

I'll help you debug it immediately!

---

## 📁 Reference Files:

- `COMPLETE_SETUP.md` - Detailed step-by-step guide
- `URGENT_FIXES.md` - Quick reference for the 3 issues
- `TROUBLESHOOTING.md` - Common errors and solutions

**Start with:** `COMPLETE_SETUP.md` for detailed instructions!

