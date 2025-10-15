"use client"

import type React from "react"

import { signIn, getProviders } from "next-auth/react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Github, Mail, AlertCircle, Sparkles, UserPlus, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignUpPage() {
  const router = useRouter()
  const [providers, setProviders] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user" as "user" | "admin",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [apiError, setApiError] = useState("")
  const [emailChecking, setEmailChecking] = useState(false)
  const [emailExists, setEmailExists] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])

  const checkEmailExists = async (email: string) => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return
    }

    setEmailChecking(true)
    try {
      const response = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      setEmailExists(data.exists)
      
      if (data.exists) {
        setErrors((prev) => ({ ...prev, email: "This email is already registered" }))
      } else {
        setErrors((prev) => ({ ...prev, email: "" }))
      }
    } catch (error) {
      console.error("Email check error:", error)
    } finally {
      setEmailChecking(false)
    }
  }

  useEffect(() => {
    // Debounce email check
    if (formData.email && /^\S+@\S+\.\S+$/.test(formData.email)) {
      const timeoutId = setTimeout(() => {
        checkEmailExists(formData.email)
      }, 500)
      return () => clearTimeout(timeoutId)
    } else {
      setEmailExists(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.email])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    // Password validation
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    } else {
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one uppercase letter"
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one lowercase letter"
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one number"
      }
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match"
    }

    // Terms acceptance
    if (!acceptTerms) {
      newErrors.terms = "Please accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError("")

    // Client-side validation
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.details) {
          // Handle validation errors from server
          const serverErrors: { [key: string]: string } = {}
          data.details.forEach((error: { field: string; message: string }) => {
            serverErrors[error.field] = error.message
          })
          setErrors(serverErrors)
        } else {
          setApiError(data.error || "Registration failed")
        }
        return
      }

      // Success - redirect to sign in
      router.push("/auth/signin?registered=true")
    } catch (error) {
      console.error("Sign up error:", error)
      setApiError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialSignIn = (providerId: string) => {
    signIn(providerId, { callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950/20 dark:to-pink-950/20 px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-violet-200 dark:border-violet-800">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Join Splitzy
          </CardTitle>
          <CardDescription className="text-center text-base">Create your account and start saving today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Social Sign Up Buttons */}
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

          {/* Error Alert */}
          {apiError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}

          {/* Email Sign Up Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${errors.email ? "border-red-500" : emailExists === false && formData.email ? "border-green-500" : ""} ${emailChecking ? "pr-10" : ""}`}
                />
                {emailChecking && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-violet-600 border-t-transparent"></div>
                  </div>
                )}
                {!emailChecking && emailExists === false && formData.email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                )}
                {!emailChecking && emailExists && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              {!errors.email && emailExists === false && formData.email && (
                <p className="text-sm text-green-600">✓ Email is available</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password (min. 6 chars, 1 uppercase, 1 number)"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Account Type</Label>
              <Select
                value={formData.role}
                onValueChange={(value: "user" | "admin") =>
                  setFormData((prev) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => {
                    setAcceptTerms(checked as boolean)
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: "" }))
                    }
                  }}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>

          <Link href="/auth/signin">
            <Button variant="outline" className="w-full border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-950/20">
              Sign in instead
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
