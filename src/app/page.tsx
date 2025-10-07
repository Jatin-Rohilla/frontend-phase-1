import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Zap, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              YourApp
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
            Build amazing experiences with our modern, scalable platform. 
            Get started in minutes and scale to millions of users.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Everything you need to build and scale your application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Optimized performance for the best user experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/60">
                  Built with modern technologies to ensure your application runs at peak performance.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Secure by Default</CardTitle>
                <CardDescription>
                  Enterprise-grade security built into every layer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/60">
                  Your data is protected with industry-standard encryption and security practices.
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-600/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Scalable</CardTitle>
                <CardDescription>
                  Grow from zero to millions of users seamlessly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/60">
                  Infrastructure that scales automatically with your needs, no configuration required.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Join thousands of developers building amazing applications
          </p>
          <div className="mt-10">
            <Link href="/signup">
              <Button size="lg">
                Create Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/60">
              © 2025 YourApp. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-foreground/60 hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-foreground/60 hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-sm text-foreground/60 hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
