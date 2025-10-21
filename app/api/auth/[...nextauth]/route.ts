import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<NextAuthUser | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          // Connect to database
          await connectDB()

          // Find user by email and include password
          const user = await User.findOne({ email: credentials.email }).select('+password')

          if (!user) {
            return null
          }

          // Check password
          const isPasswordValid = await user.comparePassword(credentials.password)

          if (!isPasswordValid) {
            return null
          }

          // Return user object
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image || null,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "Ov23li8pfyraSWIfVqFx",
      clientSecret: process.env.GITHUB_SECRET || "10e04622e55e8469a335d3dc8010cda542530338",
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-splitzy-app",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          await connectDB()
          
          // Check if user exists
          const existingUser = await User.findOne({ email: user.email })
          
          if (!existingUser) {
            // Create new user from OAuth
            await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              role: 'user',
              isVerified: true, // OAuth users are auto-verified
            })
          }
        } catch (error) {
          console.error("Error during OAuth sign in:", error)
          // Still allow sign in even if user creation fails
          return true
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = (token.role as string) || 'user'
      }
      return session
    },
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.role = (user as any).role || 'user'
      }

      // Update token when session is updated
      if (trigger === "update" && session) {
        token.name = session.name
        token.email = session.email
        token.picture = session.image
      }

      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
