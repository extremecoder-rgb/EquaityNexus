import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GenderEqualityDashboard } from "@/components/dashboard/gender-equality-dashboard"

import { genderEqualityData } from "@/lib/sdg-data"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">Empowering Equality & Inclusion</h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            A platform dedicated to combating gender inequality and social exclusion through technology, community, and
            actionable insights.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>SDG 5</CardTitle>
              <CardDescription>Gender Equality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{genderEqualityData.sdgProgress.sdg5.legalFramework}%</div>
              <p className="text-xs text-muted-foreground">of countries with laws promoting gender equality</p>
              <div className="mt-4">
                <Link href="/resources?sdg=5">
                  <Button variant="outline" size="sm" className="w-full">
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>SDG 10</CardTitle>
              <CardDescription>Reduced Inequalities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{genderEqualityData.sdgProgress.sdg10.inclusivePolicies}%</div>
              <p className="text-xs text-muted-foreground">of countries with inclusive policies</p>
              <div className="mt-4">
                <Link href="/resources?sdg=10">
                  <Button variant="outline" size="sm" className="w-full">
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Mentorship</CardTitle>
              <CardDescription>Connect & Grow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,240+</div>
              <p className="text-xs text-muted-foreground">Active mentorship connections</p>
              <div className="mt-4">
                <Link href="/mentorship">
                  <Button variant="outline" size="sm" className="w-full">
                    Find a Mentor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Bias Scanner</CardTitle>
              <CardDescription>Detect & Improve</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,800+</div>
              <p className="text-xs text-muted-foreground">Documents analyzed for bias</p>
              <div className="mt-4">
                <Link href="/bias-scanner">
                  <Button variant="outline" size="sm" className="w-full">
                    Scan for Bias
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Global Equality Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time data on gender equality and social inclusion metrics worldwide
          </p>
        </div>

        <GenderEqualityDashboard />
      </section>

      <section className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-bold">Take Action</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Discrimination</CardTitle>
                <CardDescription>Anonymously report incidents of discrimination or bias</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/report">
                  <Button className="w-full">Report Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Find a Mentor</CardTitle>
                <CardDescription>
                  Connect with mentors who can help guide your personal and professional growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/mentorship">
                  <Button className="w-full">Connect Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-3xl font-bold">Featured Resources</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inclusive Policy Toolkit</CardTitle>
                <CardDescription>Step-by-step guide for creating inclusive workplace policies</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/resources/policy-toolkit">
                  <Button className="w-full">Access Toolkit</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bias Detection Workshop</CardTitle>
                <CardDescription>
                  Learn how to identify and address unconscious bias in your organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/resources/bias-workshop">
                  <Button className="w-full">Start Workshop</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
