"use client"

import { ProtectedLayout } from "@/components/protected-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, CreditCard, TrendingUp, Plus, Shield, Activity, Sparkles, ArrowUpRight, Calendar } from "lucide-react"
import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "admin"

  return (
    <ProtectedLayout>
      <div className="space-y-8 p-6">
        {/* Header with Gradient Background */}
        <div className="relative rounded-3xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium opacity-90">
                {isAdmin ? "Administrator" : "Welcome back"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {isAdmin ? "Admin Dashboard" : `Hi, ${session?.user?.name || "User"}! 👋`}
            </h1>
            <p className="text-lg opacity-90 max-w-2xl">
              {isAdmin 
                ? "Manage the platform, monitor users, and track revenue performance" 
                : "Track your savings, manage subscriptions, and discover new group opportunities"}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isAdmin ? (
            <>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all border-violet-200 dark:border-violet-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">Total Users</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">248</div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-600 font-medium">+12 this month</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all border-blue-200 dark:border-blue-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">Active Groups</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">47</div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-600 font-medium">+5 this month</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all border-emerald-200 dark:border-emerald-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">Total Revenue</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">$12,450</div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-600 font-medium">+18% growth</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all border-pink-200 dark:border-pink-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">User Savings</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">$8,750</div>
                  <p className="text-sm text-muted-foreground mt-2">Total saved this month</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all border-violet-200 dark:border-violet-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">Active Groups</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">3</div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-600 font-medium">+1 this month</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all border-emerald-200 dark:border-emerald-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">Monthly Savings</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">$47.50</div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-600 font-medium">+12% increase</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all border-blue-200 dark:border-blue-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">Subscriptions</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
            </CardHeader>
            <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">5</div>
                  <p className="text-sm text-muted-foreground mt-2">Across 3 groups</p>
            </CardContent>
          </Card>
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all border-amber-200 dark:border-amber-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full -mr-16 -mt-16" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">Next Payment</CardTitle>
                  <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
            </CardHeader>
            <CardContent>
                  <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">$12.99</div>
                  <p className="text-sm text-muted-foreground mt-2">Due in 5 days</p>
            </CardContent>
          </Card>
            </>
          )}
        </div>

        {/* Main Content */}
        {isAdmin ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Users */}
          <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>Latest registered users</CardDescription>
                  </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">JD</span>
                      </div>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">john@example.com</p>
                      </div>
                    </div>
                    <Badge variant="secondary">User</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold">AS</span>
                      </div>
                      <div>
                        <p className="font-medium">Alice Smith</p>
                        <p className="text-sm text-muted-foreground">alice@example.com</p>
                      </div>
                    </div>
                    <Badge variant="secondary">User</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold">BJ</span>
                      </div>
                      <div>
                        <p className="font-medium">Bob Johnson</p>
                        <p className="text-sm text-muted-foreground">bob@example.com</p>
                      </div>
                    </div>
                    <Badge>Admin</Badge>
                  </div>
                </div>
            </CardContent>
          </Card>

            {/* Platform Statistics */}
          <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
                <CardDescription>Overview of platform metrics</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Groups Created</p>
                      <p className="text-2xl font-bold">124</p>
                    </div>
                    <Activity className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                      <p className="text-2xl font-bold">387</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Group Size</p>
                      <p className="text-2xl font-bold">4.2</p>
                    </div>
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
            </CardContent>
          </Card>
        </div>
        ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Groups</CardTitle>
                <CardDescription>Manage your active group memberships</CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Join Group
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-semibold">N</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Netflix Premium Group</h3>
                    <p className="text-sm text-muted-foreground">4/4 members • $4.99/month</p>
                  </div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-semibold">S</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Spotify Family Plan</h3>
                    <p className="text-sm text-muted-foreground">6/6 members • $2.50/month</p>
                  </div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">D</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Disney+ Bundle</h3>
                    <p className="text-sm text-muted-foreground">3/4 members • $5.99/month</p>
                  </div>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        )}
      </div>
    </ProtectedLayout>
  )
}
