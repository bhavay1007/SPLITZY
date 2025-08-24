"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, CreditCard, CheckCircle, Shield } from "lucide-react"

const steps = [
  {
    id: 1,
    icon: Users,
    title: "Join a Group",
    description: "Browse available plans and join a group. All members are equal - no admin roles visible.",
    details:
      "Simply click 'Join Group' on any available subscription. You'll be added to the waiting list and notified when the group fills up.",
    step: "01",
  },
  {
    id: 2,
    icon: Shield,
    title: "Wait for Group to Fill",
    description: "Track progress as more members join. No payment required until the group is complete.",
    details:
      "We use secure payment processing and only charge you when the group is complete. You'll receive an email notification before any charges.",
    step: "02",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Pay When Ready",
    description: "Once the group is full, you'll be notified to complete your payment securely.",
    details:
      "Our algorithm selects the most reliable member based on account history and verification status. The admin handles all subscription management.",
    step: "03",
  },
  {
    id: 4,
    icon: CheckCircle,
    title: "Enjoy Your Subscription",
    description: "We handle the subscription setup and assign access. Start saving immediately!",
    details:
      "You'll get access within 24 hours of payment. Enjoy the same premium features while saving up to 80% compared to individual plans.",
    step: "04",
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">How GroupSave Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, safe, and transparent. Join groups with confidence knowing you only pay when your group is ready.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Step Navigation */}
          <div className="space-y-4">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = activeStep === step.id

              return (
                <Card
                  key={step.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isActive ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="absolute -top-4 left-6">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div
                        className={`p-3 rounded-full mt-4 ${
                          isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1 mt-4">
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Active Step Details */}
          <div className="lg:sticky lg:top-8">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-8">
                {(() => {
                  const step = steps.find((s) => s.id === activeStep)!
                  const Icon = step.icon
                  return (
                    <div className="text-center">
                      <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                        <Icon className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 font-serif">{step.title}</h3>
                      <p className="text-lg text-muted-foreground mb-6">{step.details}</p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                          disabled={activeStep === 1}
                        >
                          Previous
                        </Button>
                        <Button onClick={() => setActiveStep(Math.min(4, activeStep + 1))} disabled={activeStep === 4}>
                          Next Step
                        </Button>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Safety First</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            We manage all subscriptions transparently. If any member misuses access, we handle the situation and ensure
            continuity for all other members.
          </p>
        </div>
      </div>
    </section>
  )
}
