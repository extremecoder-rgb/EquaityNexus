import { MentorshipConnect } from "@/components/mentorship/mentorship-connect"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MentorshipPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">Mentorship Connect</h1>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          AI-powered matching system connecting mentors and mentees based on skills, interests, and demographics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Find Your Match</CardTitle>
            <CardDescription>Complete your profile to get matched with the perfect mentor or mentee</CardDescription>
          </CardHeader>
          <CardContent>
            <MentorshipConnect />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">1. Create Your Profile</h3>
                <p className="text-sm text-muted-foreground">Share your skills, interests, goals, and preferences.</p>
              </div>
              <div>
                <h3 className="font-medium">2. AI Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Our Gemini 1.5 Pro AI analyzes profiles to find optimal mentor-mentee matches.
                </p>
              </div>
              <div>
                <h3 className="font-medium">3. Connect & Grow</h3>
                <p className="text-sm text-muted-foreground">
                  Start your mentorship journey with secure messaging, goal tracking, and resources.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Success Stories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Sarah & Mei</p>
                <p className="text-xs text-muted-foreground">
                  "My mentor helped me navigate the tech industry as a woman of color. I've since been promoted to
                  Senior Developer."
                </p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">James & Aisha</p>
                <p className="text-xs text-muted-foreground">
                  "As a mentor, I've gained as much as I've given. Seeing my mentee succeed in policy advocacy has been
                  incredibly rewarding."
                </p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Alex & Jordan</p>
                <p className="text-xs text-muted-foreground">
                  "Finding a non-binary mentor in my field helped me navigate workplace challenges I thought I'd face
                  alone."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
