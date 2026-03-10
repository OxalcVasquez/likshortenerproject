import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Link2, PenLine, BarChart2, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroCTA } from "@/components/homepage/HeroCTA";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center sm:py-32">
        <Badge variant="secondary" className="mb-6">
          ✨ Simple. Fast. Powerful.
        </Badge>
        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Shorten URLs,{" "}
          <span className="text-muted-foreground">Amplify Your Reach</span>
        </h1>
        <p className="mb-10 max-w-xl text-lg text-muted-foreground">
          Transform long, unwieldy links into clean, shareable short URLs in
          seconds. Track every click and grow your audience with Lik Shortener.
        </p>
        <HeroCTA />
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
              Everything you need to manage links
            </h2>
            <p className="text-muted-foreground">
              Powerful features to help you create, manage, and track your short
              URLs.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Link2 className="size-5 text-foreground" />
                </div>
                <CardTitle className="text-lg">Instant Shortening</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Paste any long URL and get a short, shareable link in
                  milliseconds. No friction, no fuss.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted">
                  <PenLine className="size-5 text-foreground" />
                </div>
                <CardTitle className="text-lg">Custom Short Links</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create branded, memorable slugs that reflect your content.
                  Stand out with personalized URLs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted">
                  <BarChart2 className="size-5 text-foreground" />
                </div>
                <CardTitle className="text-lg">Click Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track how many people click your links and monitor your
                  campaign performance in real time.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Zap className="size-5 text-foreground" />
                </div>
                <CardTitle className="text-lg">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built on modern infrastructure to ensure every redirect
                  happens in the blink of an eye.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-t border-border px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
              How it works
            </h2>
            <p className="text-muted-foreground">
              Get your first short URL in three simple steps.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full border-2 border-border bg-muted text-lg font-bold text-foreground">
                1
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                Create your account
              </h3>
              <p className="text-sm text-muted-foreground">
                Sign up for free in seconds. No credit card required.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full border-2 border-border bg-muted text-lg font-bold text-foreground">
                2
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                Paste your long URL
              </h3>
              <p className="text-sm text-muted-foreground">
                Drop any URL into the dashboard and optionally add a custom
                slug.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full border-2 border-border bg-muted text-lg font-bold text-foreground">
                3
              </div>
              <h3 className="mb-2 font-semibold text-foreground">
                Share your short link
              </h3>
              <p className="text-sm text-muted-foreground">
                Copy and share your new short URL anywhere — social media,
                emails, or messages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
            Ready to shorten your first link?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join thousands of users who trust Lik Shortener to manage their
            links every day.
          </p>
          <ul className="mb-10 flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:justify-center">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-foreground" />
              Free to get started
            </li>
            <li className="hidden sm:block">·</li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-foreground" />
              No credit card required
            </li>
            <li className="hidden sm:block">·</li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-foreground" />
              Unlimited short links
            </li>
          </ul>
          <HeroCTA />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Lik Shortener. All rights reserved.</p>
      </footer>
    </div>
  );
}
