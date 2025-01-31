import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Check, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl p-5 space-y-20 lg:px-8 pt-32 pb-20">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="scroll-m-20 text-5xl font-extrabold md:leading-relaxed lg:text-9xl ">
          Let&apos;s Cut Dev Time & Bugs in Half
        </h1>
        <p className="scroll-m-20 text-2xl max-w-[40.75rem] mx-auto text-muted-foreground">
          Revolutionizing software development with AI-driven micro-tools to
          help you code faster, smarter, and more efficiently.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user%20repo`}
          >
            <Button size="lg" className="rounded-full">
              <Github className="mr-2 h-5 w-5" /> Login with GitHub
            </Button>
          </a>
          <Button size="lg" variant="outline" className="rounded-full">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">
          Powerful AI-Driven Features
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mx-auto">
          <Card className="border-yellow-400/30">
            <CardHeader>
              <CardTitle className="font-black">
                Instant Code Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Get AI-generated README files, best practices, and real-time
                code reviews. Enhance your development workflow with intelligent
                suggestions.
              </p>
            </CardContent>
          </Card>
          <Card className="border-pink-400/30">
            <CardHeader>
              <CardTitle className="font-black">Enhanced Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Identify vulnerabilities before they become risks. Our AI scans
                your code for potential security issues and suggests fixes.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="font-black">Smarter Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                AI-powered test case generation and execution. Improve your code
                coverage and catch bugs before they make it to production.
              </p>
            </CardContent>
          </Card>
          <Card className="border-green-400/30">
            <CardHeader>
              <CardTitle className="font-black">Automated Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Get real-time insights on every push. Our AI analyzes your
                commits and provides actionable feedback to improve your code
                quality.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect Your Repo</h3>
            <p className="text-muted-foreground">
              Link your GitHub repository to our platform with just a few
              clicks.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your code, providing insights and suggestions.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Improve & Iterate</h3>
            <p className="text-muted-foreground">
              Apply AI-driven improvements and watch your code quality soar.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">What Developers Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Amazing Tool!</CardTitle>
              <CardDescription>John Doe, Senior Developer</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                "This AI-powered platform has significantly improved our team's
                productivity. The code insights are spot-on!"
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Game Changer</CardTitle>
              <CardDescription>Jane Smith, CTO</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                "The automated security checks have saved us from potential
                vulnerabilities multiple times. A must-have for any dev team!"
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>For individual developers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">
                £19<span className="text-lg font-normal">/month</span>
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 1 repository
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> Basic code
                  insights
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> Security
                  scanning
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For growing teams</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">
                £49<span className="text-lg font-normal">/month</span>
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> 5
                  repositories
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> Advanced
                  code insights
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> Security
                  scanning
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> AI-powered
                  testing
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For large organizations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">Custom</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> Unlimited
                  repositories
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> Advanced
                  code insights
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> Security
                  scanning
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> AI-powered
                  testing
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-green-500" /> Dedicated
                  support
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact Sales</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 bg-primary text-primary-foreground p-12 rounded-3xl">
        <h2 className="text-3xl font-bold">
          Ready to Supercharge Your Development?
        </h2>
        <p className="text-xl max-w-2xl mx-auto">
          Join thousands of developers who are already using our AI-powered
          platform to write better code, faster.
        </p>
        <Button size="lg" variant="secondary" className="rounded-full">
          Get Started for Free
        </Button>
      </section>
    </div>
  );
}
