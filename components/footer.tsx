import { Users, Mail, MessageCircle, FileText } from "lucide-react"

export function Footer() {
  return (
    <footer id="support" className="bg-muted/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold font-serif">Splitzy</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The safe and transparent way to split digital subscriptions and save money together.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Available Plans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Request Plan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Safety & Security
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get Help</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@splitzy.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>Live Chat (9AM-6PM)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-primary" />
                <span>Help Center</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 Splitzy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
