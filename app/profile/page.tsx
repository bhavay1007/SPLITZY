"use client"

import type React from "react"

import { ProtectedLayout } from "@/components/protected-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Upload } from "lucide-react"

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    phone: "",
    image: "",
  })

  useEffect(() => {
    if (session?.user) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile")
      const data = await response.json()

      if (response.ok && data.user) {
        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          bio: data.user.bio || "",
          phone: data.user.phone || "",
          image: data.user.image || "",
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    // Phone validation (optional)
    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Bio validation (optional)
    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = "Bio cannot exceed 500 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    setError("")
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
          setError(data.error || "Failed to update profile")
        }
        return
      }

      setSuccess("Profile updated successfully!")
      setIsEditing(false)

      // Update session with new data
      await update({
        name: formData.name,
        email: formData.email,
        image: formData.image,
      })
    } catch (error) {
      console.error("Update profile error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setErrors({})
    setError("")
    setSuccess("")
    fetchProfile()
  }

  return (
    <ProtectedLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>

        {/* Alerts */}
        {success && (
          <Alert className="border-green-500 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.image || session?.user?.image || ""} />
                  <AvatarFallback className="text-lg">
                    {formData.name?.charAt(0) || session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              {isEditing && (
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <Badge variant={session?.user?.role === "admin" ? "default" : "secondary"}>
                  {session?.user?.role === "admin" ? "Admin" : "User"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your phone number (e.g., +1234567890)"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself"
                  rows={3}
                  className={errors.bio ? "border-red-500" : ""}
                />
                {errors.bio && <p className="text-sm text-red-500">{errors.bio}</p>}
                <p className="text-xs text-muted-foreground">{formData.bio.length}/500 characters</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
            <CardDescription>Your Splitzy activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">3</div>
                <p className="text-sm text-muted-foreground">Active Groups</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">$142.50</div>
                <p className="text-sm text-muted-foreground">Total Saved</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">8</div>
                <p className="text-sm text-muted-foreground">Months Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  )
}
