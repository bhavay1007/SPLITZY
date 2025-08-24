"use client"
import { Button } from "@/components/ui/button"
import { Users, Menu, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export function Header() {
  const { data: session, status } = useSession()

  const handleSignIn = () => {
    window.location.href = "/auth/signin"
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  const handleJoinNow = () => {
    window.location.href = "/auth/signup"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          <Link href="/" className="text-xl font-bold font-serif hover:text-primary transition-colors">
            GroupSave
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#plans" className="text-sm font-medium hover:text-primary transition-colors">
            Plans
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How it Works
          </a>
          <a href="#calculator" className="text-sm font-medium hover:text-primary transition-colors">
            Calculator
          </a>
          <a href="#support" className="text-sm font-medium hover:text-primary transition-colors">
            Support
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <Button variant="ghost" size="sm" disabled>
              Loading...
            </Button>
          ) : session ? (
            <div className="flex items-center gap-2">
              <span className="text-sm hidden md:inline">Hi, {session.user?.name || "User"}!</span>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleSignIn} className="hidden md:inline-flex">
              Sign In
            </Button>
          )}
          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleJoinNow}>
            Join Now
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
