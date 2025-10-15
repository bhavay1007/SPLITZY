import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "College Student",
    content: "I've saved over $200 this year on my subscriptions! The process is so simple and transparent.",
    rating: 5,
    savings: "$18/month",
  },
  {
    name: "Mike Rodriguez",
    role: "Software Developer",
    content: "Finally, a way to get premium subscriptions without breaking the bank. The group system works perfectly.",
    rating: 5,
    savings: "$35/month",
  },
  {
    name: "Emily Johnson",
    role: "Marketing Manager",
    content: "I was skeptical at first, but Splitzy delivered exactly what they promised. Highly recommend!",
    rating: 5,
    savings: "$28/month",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">What Our Users Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who are saving money on their favorite subscriptions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">Saves</p>
                    <p className="text-lg font-bold text-primary">{testimonial.savings}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">10,000+</p>
              <p className="text-sm text-muted-foreground">Happy Users</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">$2.5M+</p>
              <p className="text-sm text-muted-foreground">Total Saved</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
