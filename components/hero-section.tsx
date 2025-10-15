"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, Users, DollarSign, Sparkles, Zap, Star } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 dark:from-violet-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-200 dark:border-violet-800">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Save up to 70% on subscriptions
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Split Subscriptions,
            </span>
            <br />
            <span className="text-foreground">Save Together</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Join groups to unlock family plan pricing on <span className="font-semibold text-foreground">Netflix, Spotify, YouTube Premium</span> and more. 
            Pay only when your group is complete. 🚀
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white text-lg px-10 py-6 rounded-full shadow-lg shadow-purple-500/50 transform hover:scale-105 transition-all"
              onClick={() => scrollToSection("plans")}
            >
              Browse Plans
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-6 rounded-full border-2 hover:bg-purple-50 dark:hover:bg-purple-950/20"
              onClick={() => scrollToSection("how-it-works")}
            >
              <Zap className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="group p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-violet-50/50 dark:from-gray-900 dark:to-violet-950/20 border-violet-200 dark:border-violet-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3">100% Safe & Secure</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Pay only when your group is complete. No advance payments required.
              </p>
            </Card>

            <Card className="group p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/50 dark:from-gray-900 dark:to-purple-950/20 border-purple-200 dark:border-purple-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3">Easy Group Joining</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Join existing groups instantly or create new ones. All users are equal.
              </p>
            </Card>

            <Card className="group p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-pink-50/50 dark:from-gray-900 dark:to-pink-950/20 border-pink-200 dark:border-pink-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-3">Massive Savings</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Save up to 70% on your favorite subscriptions every month.
              </p>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex items-center justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">Trusted by 10,000+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">100% Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-500" />
              <span className="text-sm font-medium">Instant Group Matching</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
