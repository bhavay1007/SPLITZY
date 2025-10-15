# Complete Step-by-Step Setup Guide

## 🎯 Follow These Steps in Order:

---

## STEP 1: Update GitHub OAuth Settings (2 minutes)

Since your app is running on port **3001** (not 3000), you need to update GitHub:

1. **Open:** https://github.com/settings/developers
2. **Find your OAuth app** (Client ID starts with `Ov23libHc9...`)
3. **Click the app name to edit**
4. **Update these fields:**
   - Homepage URL: `http://localhost:3001`
   - Authorization callback URL: `http://localhost:3001/api/auth/callback/github`
5. **Click "Update application"**

✅ **Result:** GitHub OAuth will work for direct login (no signup needed)

---

## STEP 2: Setup MongoDB Atlas (5 minutes)

### 2.1 Create Account & Cluster

1. **Go to:** https://www.mongodb.com/cloud/atlas/register
2. **Sign up** with email (free account)
3. **Choose deployment:**
   - Select: "M0 FREE"
   - Cloud Provider: AWS (or any)
   - Region: Choose closest to you
   - Cluster Name: Keep default or name it "Cluster0"
4. **Click "Create Deployment"**
5. **Wait 2-3 minutes** for cluster to be created

### 2.2 Create Database User

You'll see a popup or go to "Database Access":

1. **Username:** `groupbuyuser`
2. **Password:** `GroupBuy123` (save this!)
3. **Database User Privileges:** "Read and write to any database"
4. **Click "Create Database User"**

### 2.3 Configure Network Access

1. **Go to "Network Access"** in left sidebar
2. **Click "Add IP Address"**
3. **Click "Allow Access From Anywhere"** (for development)
4. **Click "Confirm"**

### 2.4 Get Connection String

1. **Go back to "Database"** in left sidebar
2. **Click "Connect"** button
3. **Choose "Drivers"**
4. **Driver:** Node.js, Version: 6.7 or later
5. **Copy the connection string** - it looks like:
   ```
   mongodb+srv://groupbuyuser:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Modify the string:**
   - Replace `<password>` with `GroupBuy123`
   - Add `/groupbuyingplatform` before the `?`
   
   **Final string should look like:**
   ```
   mongodb+srv://groupbuyuser:GroupBuy123@cluster0.abcde.mongodb.net/groupbuyingplatform?retryWrites=true&w=majority
   ```

### 2.5 Update .env.local

1. **Open:** `groupbuyingplatform/.env.local`
2. **Find the line:** `MONGODB_URI=mongodb://localhost:27017/groupbuyingplatform`
3. **Replace it with your Atlas connection string:**
   ```env
   MONGODB_URI=mongodb+srv://groupbuyuser:GroupBuy123@cluster0.abcde.mongodb.net/groupbuyingplatform?retryWrites=true&w=majority
   ```
4. **Save the file**

✅ **Result:** MongoDB database ready!

---

## STEP 3: Restart Your Application

1. **Stop the current server:**
   - Go to terminal
   - Press `Ctrl+C`

2. **Delete .next folder** (clears cache):
   ```bash
   rd /s /q .next
   ```

3. **Start fresh:**
   ```bash
   npm run dev
   ```

4. **Check terminal output:**
   
   You should see:
   ```
   ✅ MongoDB connected successfully
   ✓ Ready in Xs
   Local: http://localhost:3001
   ```

✅ **Result:** App running with database connected!

---

## STEP 4: Test Everything

### Test A: Email/Password Signup

1. **Open browser:** http://localhost:3001/auth/signup
2. **Fill the form:**
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test123` (must have uppercase, lowercase, number)
   - Confirm Password: `Test123`
   - Account Type: `User`
   - ✅ Check "I agree to terms"
3. **Click "Create account"**
4. **Expected:** Success message + redirect to signin page

### Test B: Email/Password Login

1. **You should be on signin page** (or go to http://localhost:3001/auth/signin)
2. **Enter credentials:**
   - Email: `test@example.com`
   - Password: `Test123`
3. **Click "Sign in"**
4. **Expected:** Redirect to dashboard with "Welcome back, Test User!"

### Test C: GitHub OAuth (Direct Login)

1. **Go to:** http://localhost:3001/auth/signin
2. **Click "Continue with GitHub"**
3. **Expected:**
   - Redirects to GitHub
   - Shows authorization screen (first time only)
   - Click "Authorize"
   - Redirects back to app
   - **Auto-creates account and logs you in!**
   - Dashboard shows your GitHub name
4. **No signup needed!** GitHub OAuth creates account automatically

### Test D: Profile Editing

1. **Go to:** http://localhost:3001/profile
2. **Click "Edit Profile"**
3. **Update information:**
   - Name, phone, bio, etc.
4. **Click "Save Changes"**
5. **Expected:** Success message

---

## STEP 5: Verify in MongoDB Atlas

1. **Go to:** https://cloud.mongodb.com
2. **Navigate to:** Database → Browse Collections
3. **You should see:**
   - Database: `groupbuyingplatform`
   - Collection: `users`
   - Your registered users inside!

---

## ✅ Success Indicators

After following all steps, you should have:

- ✅ App running on http://localhost:3001
- ✅ MongoDB connected (see terminal message)
- ✅ Can signup with email/password
- ✅ Can login with email/password
- ✅ Can login with GitHub OAuth (auto-creates account)
- ✅ Dashboard shows based on user role
- ✅ Can edit profile

---

## 🔧 Troubleshooting

### "MongoDB connection error"

**Check:**
- Is cluster ready? (wait 2-3 minutes after creation)
- Did you replace `<password>` with actual password?
- Did you add `/groupbuyingplatform` before the `?`?
- Is IP whitelisted? (should be "Allow from anywhere")

**Example correct URI:**
```
mongodb+srv://groupbuyuser:GroupBuy123@cluster0.abc12.mongodb.net/groupbuyingplatform?retryWrites=true&w=majority
```

### GitHub OAuth not working

**Check:**
- Did you update callback URL to `http://localhost:3001/api/auth/callback/github`?
- Did you update homepage URL to `http://localhost:3001`?
- Is app running on 3001? (check terminal)

### "Validation error" on signup

**Password requirements:**
- Minimum 6 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)

**Valid examples:** `Test123`, `Password1`, `Hello123`

### Port 3001 already in use

**Kill the process:**
```bash
# Find process on port 3001
netstat -ano | findstr :3001

# Kill it (replace XXXX with PID from above)
taskkill /PID XXXX /F

# Restart app
npm run dev
```

---

## 🎯 After Setup - Normal Usage

### Starting the app:
```bash
npm run dev
```

### Accessing the app:
- Signup: http://localhost:3001/auth/signup
- Login: http://localhost:3001/auth/signin
- Dashboard: http://localhost:3001/dashboard
- Profile: http://localhost:3001/profile

### GitHub OAuth login flow:
1. Click "Continue with GitHub" on signin page
2. Authorize (first time only)
3. Auto-logged in with account created!

---

## 📱 Contact for Help

If stuck, share:
1. Terminal output (copy full text)
2. Browser console errors (F12 → Console tab)
3. Which step you're on
4. Screenshot of the error

I'll help you debug it!

---

**Estimated Total Time: 10 minutes**
**Difficulty: Easy** ⭐⭐☆☆☆

