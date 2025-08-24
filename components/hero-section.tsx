"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, Users, DollarSign } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
            Split Digital Subscriptions, <span className="text-primary">Save Big Together</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join groups to get family plan pricing on Spotify, Netflix, YouTube Premium and more. Pay only when your
            group is complete.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8"
              onClick={() => scrollToSection("plans")}
            >
              Browse Plans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-transparent"
              onClick={() => scrollToSection("how-it-works")}
            >
              How It Works
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">100% Safe</h3>
              <p className="text-sm text-muted-foreground">
                Pay only when your group is complete. No advance payments.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Easy Groups</h3>
              <p className="text-sm text-muted-foreground">
                Join existing groups or create new ones. All users are equal.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Big Savings</h3>
              <p className="text-sm text-muted-foreground">Save up to 70% on your favorite digital subscriptions.</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
