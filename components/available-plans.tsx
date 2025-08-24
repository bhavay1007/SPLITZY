"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, Clock } from "lucide-react"
import { useSession } from "next-auth/react"

const plans = [
  {
    id: 1,
    service: "Spotify Premium",
    type: "Family Plan",
    originalPrice: 15.99,
    groupPrice: 2.67,
    maxMembers: 6,
    currentMembers: 4,
    timeLeft: "2 days",
    savings: "83%",
    logo: "/spotify-logo.png",
  },
  {
    id: 2,
    service: "Netflix Premium",
    type: "Family Plan",
    originalPrice: 19.99,
    groupPrice: 5.0,
    maxMembers: 4,
    currentMembers: 2,
    timeLeft: "5 days",
    savings: "75%",
    logo: "/netflix-logo.png",
  },
  {
    id: 3,
    service: "YouTube Premium",
    type: "Family Plan",
    originalPrice: 17.99,
    groupPrice: 3.0,
    maxMembers: 6,
    currentMembers: 5,
    timeLeft: "1 day",
    savings: "83%",
    logo: "/youtube-logo.png",
  },
  {
    id: 4,
    service: "Disney+ Bundle",
    type: "Family Plan",
    originalPrice: 19.99,
    groupPrice: 4.0,
    maxMembers: 5,
    currentMembers: 3,
    timeLeft: "3 days",
    savings: "80%",
    logo: "/generic-streaming-logo.png",
  },
]

export function AvailablePlans() {
  const { data: session, status } = useSession()
  const [joinedGroups, setJoinedGroups] = useState(new Set<number>())

  const handleJoinGroup = (planId: number) => {
    if (!session) {
      window.location.href = "/auth/signin"
      return
    }

    setJoinedGroups((prev) => new Set([...prev, planId]))
    alert("Successfully joined the group! You will be notified when the group is full.")
  }

  return (
    <section id="plans" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Available Groups</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join active groups and start saving immediately. Payment is only processed when groups are full.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const progress = (plan.currentMembers / plan.maxMembers) * 100
            const isJoined = joinedGroups.has(plan.id)
            const isFull = plan.currentMembers >= plan.maxMembers

            return (
              <Card key={plan.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={plan.logo || "/placeholder.svg"} alt={plan.service} className="w-10 h-10 rounded" />
                    <div>
                      <CardTitle className="text-lg">{plan.service}</CardTitle>
                      <CardDescription>{plan.type}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit bg-green-100 text-green-800">
                    Save {plan.savings}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        ${plan.groupPrice}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </p>
                      <p className="text-sm text-muted-foreground line-through">${plan.originalPrice}/month</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {plan.currentMembers}/{plan.maxMembers}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {plan.timeLeft}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Group Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handleJoinGroup(plan.id)}
                    disabled={isJoined || isFull}
                    variant={isJoined ? "secondary" : "default"}
                  >
                    {isFull ? "Group Full" : isJoined ? "Joined!" : "Join Group"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Request New Plan
          </Button>
        </div>
      </div>
    </section>
  )
}
