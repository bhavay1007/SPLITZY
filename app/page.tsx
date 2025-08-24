import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AvailablePlans } from "@/components/available-plans"
import { HowItWorks } from "@/components/how-it-works"
import { SavingsCalculator } from "@/components/savings-calculator"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AvailablePlans />
        <HowItWorks />
        <SavingsCalculator />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
