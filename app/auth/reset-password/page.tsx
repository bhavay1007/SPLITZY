"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState(false)
  const [token, setToken] = useState("")

  useEffect(() => {
    const tokenParam = searchParams.get("token")
    if (!tokenParam) {
      setError("Invalid or missing reset token")
    } else {
      setToken(tokenParam)
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    if (!token) {
      setError("Invalid or missing reset token")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          token,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.details) {
          const serverErrors: { [key: string]: string } = {}
          data.details.forEach((error: { field: string; message: string }) => {
            serverErrors[error.field] = error.message
          })
          setErrors(serverErrors)
        } else {
          setError(data.error || "Failed to reset password")
        }
        return
      }

      setSuccess(true)
      // Redirect to signin after 3 seconds
      setTimeout(() => {
        router.push("/auth/signin")
      }, 3000)
    } catch (error) {
      console.error("Reset password error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success ? (
            <div className="space-y-4">
              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  Password reset successfully! Redirecting to sign in...
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a new password (min. 6 chars, 1 uppercase, 1 number)"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || !token}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>

              <Link href="/auth/signin">
                <Button variant="outline" className="w-full" type="button">
                  Back to Sign In
                </Button>
              </Link>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

