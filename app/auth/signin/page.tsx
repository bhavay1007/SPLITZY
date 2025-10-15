"use client"

import type React from "react"

import { signIn, getProviders } from "next-auth/react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Mail, AlertCircle, CheckCircle, Sparkles } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [providers, setProviders] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()

    // Check for registration success
    if (searchParams.get("registered") === "true") {
      setSuccess("Account created successfully! Please sign in.")
    }

    // Check for auth errors
    const authError = searchParams.get("error")
    if (authError) {
      setError("Authentication failed. Please try again.")
    }
  }, [searchParams])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else if (result?.ok) {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Sign in error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: "/dashboard" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-pink-950/20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-violet-200 dark:border-violet-800">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-base">Sign in to continue to Splitzy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Success Alert */}
          {success && (
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">{success}</AlertDescription>
            </Alert>
          )}

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Social Sign In Buttons */}
          <div className="space-y-2">
            {providers?.github && (
              <Button variant="outline" className="w-full bg-transparent" onClick={() => handleSocialSignIn("github")}>
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
            )}
            {providers?.google && (
              <Button variant="outline" className="w-full bg-transparent" onClick={() => handleSocialSignIn("google")}>
                <Mail className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Sign In Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <Link href="/auth/forgot-password" className="text-violet-600 hover:text-violet-700 font-medium hover:underline">
              Forgot your password?
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                New to Splitzy?
              </span>
            </div>
          </div>

          <Link href="/auth/signup">
            <Button variant="outline" className="w-full border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-950/20">
              Create an account
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
