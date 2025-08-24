"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingDown } from "lucide-react"

const subscriptions = [
  { name: "Spotify Premium", individual: 10.99, family: 16.99, members: 6 },
  { name: "Netflix Premium", individual: 22.99, family: 22.99, members: 4 },
  { name: "YouTube Premium", individual: 13.99, family: 22.99, members: 6 },
  { name: "Disney+ Bundle", individual: 19.99, family: 25.99, members: 4 },
  { name: "Apple One", individual: 16.95, family: 22.95, members: 6 },
]

export function SavingsCalculator() {
  const [selectedSubs, setSelectedSubs] = useState<string[]>([])

  const toggleSubscription = (subName: string) => {
    setSelectedSubs((prev) => (prev.includes(subName) ? prev.filter((name) => name !== subName) : [...prev, subName]))
  }

  const calculateSavings = () => {
    const selected = subscriptions.filter((sub) => selectedSubs.includes(sub.name))
    const individualTotal = selected.reduce((sum, sub) => sum + sub.individual, 0)
    const groupTotal = selected.reduce((sum, sub) => sum + sub.family / sub.members, 0)
    const monthlySavings = individualTotal - groupTotal
    const yearlySavings = monthlySavings * 12

    return {
      individualTotal,
      groupTotal,
      monthlySavings,
      yearlySavings,
      percentageSaved: individualTotal > 0 ? (monthlySavings / individualTotal) * 100 : 0,
    }
  }

  const savings = calculateSavings()

  return (
    <section id="calculator" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Calculate Your Savings</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how much you could save by joining groups for your favorite subscriptions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Select Your Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.name}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedSubs.includes(sub.name)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleSubscription(sub.name)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{sub.name}</h4>
                        <p className="text-sm text-muted-foreground">${sub.individual}/month individual</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">${(sub.family / sub.members).toFixed(2)}/month</p>
                        <p className="text-xs text-muted-foreground">in group of {sub.members}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Your Potential Savings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedSubs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Select subscriptions to see your savings</p>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Individual plans:</span>
                        <span className="font-medium">${savings.individualTotal.toFixed(2)}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Group plans:</span>
                        <span className="font-medium text-primary">${savings.groupTotal.toFixed(2)}/month</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Monthly savings:</span>
                        <span className="text-primary">${savings.monthlySavings.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-primary mb-1">${savings.yearlySavings.toFixed(0)}</p>
                      <p className="text-sm text-muted-foreground">saved per year</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">
                        {savings.percentageSaved.toFixed(0)}% savings
                      </Badge>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">Start Saving Now</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
