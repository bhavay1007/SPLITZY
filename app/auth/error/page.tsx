"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Home } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration. Please contact support."
      case "AccessDenied":
        return "Access denied. You do not have permission to sign in."
      case "Verification":
        return "The verification token has expired or has already been used."
      case "OAuthSignin":
        return "Error in constructing an authorization URL. Please try again."
      case "OAuthCallback":
        return "Error in handling the response from the OAuth provider."
      case "OAuthCreateAccount":
        return "Could not create OAuth account. This email might already be registered."
      case "EmailCreateAccount":
        return "Could not create email account. This email might already be registered."
      case "Callback":
        return "Error in the OAuth callback handler. Please try again."
      case "OAuthAccountNotLinked":
        return "This email is already registered with a different sign-in method."
      case "EmailSignin":
        return "Error sending the email verification. Please try again."
      case "CredentialsSignin":
        return "Invalid email or password. Please check your credentials."
      case "SessionRequired":
        return "Please sign in to access this page."
      default:
        return "An unexpected error occurred. Please try again."
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Authentication Error</CardTitle>
          <CardDescription className="text-center">Something went wrong during authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Link href="/auth/signin">
              <Button className="w-full">Try Again</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>

          {error && (
            <div className="text-center text-sm text-muted-foreground">
              <p>Error code: {error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
