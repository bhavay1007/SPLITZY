# Splitzy - Split Digital Subscriptions & Save Together

A comprehensive Next.js application with user/admin authentication, profile management, and forgot password functionality.

## Features

✅ **User & Admin Registration**
- Front-end and back-end validation
- Password strength requirements
- Role-based account types (User/Admin)
- Email uniqueness checking

✅ **Login System**
- Email and password authentication
- OAuth integration (GitHub, Google)
- JWT-based session management
- Secure credential validation

✅ **Forgot Password**
- Email-based password reset
- Secure token generation
- 1-hour token expiration
- Password reset validation

✅ **Dashboard**
- Role-based views (User vs Admin)
- User dashboard with group subscriptions
- Admin dashboard with platform statistics
- Real-time statistics display

✅ **Profile Management**
- Edit profile information
- Update name, email, phone, bio
- Profile picture management
- Client and server-side validation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Components**: shadcn/ui + Radix UI
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **Validation**: Zod
- **Email**: Nodemailer
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Prerequisites

- Node.js 18+ installed
- MongoDB installed and running (or MongoDB Atlas account)
- SMTP server credentials (Gmail, SendGrid, etc.)

## Installation

### 1. Clone and Install Dependencies

```bash
cd groupbuyingplatform
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/groupbuyingplatform

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# Email Configuration (for forgot password)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@splitzy.com

# OAuth Providers (Optional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

### 4. Gmail Setup (for email functionality)

1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password
4. Use this app password in `EMAIL_SERVER_PASSWORD`

### 5. Start MongoDB

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI with your Atlas connection string
```

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
groupbuyingplatform/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth configuration
│   │   │   ├── register/route.ts         # Registration API
│   │   │   ├── forgot-password/route.ts  # Forgot password API
│   │   │   └── reset-password/route.ts   # Reset password API
│   │   └── profile/route.ts              # Profile API
│   ├── auth/
│   │   ├── signin/page.tsx               # Sign in page
│   │   ├── signup/page.tsx               # Sign up page
│   │   ├── forgot-password/page.tsx      # Forgot password page
│   │   └── reset-password/page.tsx       # Reset password page
│   ├── dashboard/page.tsx                # Dashboard (User/Admin)
│   └── profile/page.tsx                  # Profile page
├── components/                           # UI Components
├── lib/
│   ├── mongodb.ts                        # Database connection
│   ├── validations.ts                    # Zod schemas
│   ├── email.ts                          # Email utility
│   └── utils.ts                          # Helper functions
├── models/
│   └── User.ts                           # User model
└── types/
    └── next-auth.d.ts                    # TypeScript definitions
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Profile

- `GET /api/profile` - Get user profile
- `PATCH /api/profile` - Update user profile

## Validation Rules

### Registration
- Name: 2-50 characters
- Email: Valid email format
- Password: Min 6 characters, 1 uppercase, 1 lowercase, 1 number
- Role: 'user' or 'admin'

### Profile Update
- Name: 2-50 characters (optional)
- Email: Valid email format (optional)
- Phone: Valid international format (optional)
- Bio: Max 500 characters (optional)

## Security Features

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT-based session management
- ✅ CSRF protection via NextAuth
- ✅ SQL Injection prevention (Mongoose ORM)
- ✅ XSS prevention (React escaping)
- ✅ Rate limiting considerations
- ✅ Secure password reset tokens (SHA-256)
- ✅ Token expiration (1 hour)
- ✅ Email enumeration prevention

## User Roles

### User
- Access to personal dashboard
- View subscription groups
- Manage personal profile
- Track savings and payments

### Admin
- Access to admin dashboard
- View all users
- Platform statistics
- Revenue tracking
- User management capabilities

## Testing

### Test User Registration
1. Go to `/auth/signup`
2. Fill in the form with:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123 (meets requirements)
   - Role: User or Admin
3. Accept terms and submit

### Test Login
1. Go to `/auth/signin`
2. Enter credentials
3. Redirects to `/dashboard`

### Test Forgot Password
1. Go to `/auth/forgot-password`
2. Enter registered email
3. Check email for reset link
4. Click link and set new password

### Test Profile Edit
1. Login and go to `/profile`
2. Click "Edit Profile"
3. Update information
4. Click "Save Changes"

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env.local
- Verify network connectivity

### Email Not Sending
- Verify EMAIL_SERVER credentials
- Check spam folder
- Use app-specific password for Gmail
- Ensure port 587 is not blocked

### NextAuth Error
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies

### Build Errors
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Check for TypeScript errors

## Production Deployment

### Environment Variables
Set all environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- Railway: Variables tab

### Database
- Use MongoDB Atlas for production
- Enable IP whitelist
- Use strong credentials

### Security
- Change NEXTAUTH_SECRET to a strong random string
- Use HTTPS in production
- Enable rate limiting
- Set up monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the code comments

## Credits

Built with:
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)

