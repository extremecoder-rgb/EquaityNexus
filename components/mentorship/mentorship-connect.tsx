"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, UserCircle } from "lucide-react"
import { setStorageValue } from "@/lib/async-storage"


const mentorProfiles = [
  {
    id: 1,
    name: "Dr. Maya Johnson",
    role: "Senior Data Scientist",
    organization: "TechInnovate",
    skills: ["Data Science", "Machine Learning", "Leadership"],
    interests: ["AI Ethics", "Women in STEM", "Mentorship"],
    bio: "With 15 years in data science, I'm passionate about helping underrepresented groups succeed in tech. My focus is on ethical AI and creating inclusive teams.",
    image: "/placeholder.svg?height=100&width=100",
    match: 95,
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    role: "Policy Director",
    organization: "Global Equality Initiative",
    skills: ["Policy Development", "Advocacy", "Public Speaking"],
    interests: ["Social Justice", "Education Access", "Community Building"],
    bio: "Former UN advisor with expertise in developing inclusive policies. I help mentees navigate complex policy landscapes and develop their advocacy skills.",
    image: "/placeholder.svg?height=100&width=100",
    match: 88,
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "CEO & Founder",
    organization: "Inclusive Futures",
    skills: ["Entrepreneurship", "Strategic Planning", "Fundraising"],
    interests: ["Social Enterprise", "Women's Economic Empowerment", "Sustainable Development"],
    bio: "First-generation entrepreneur who built a social enterprise focused on women's economic empowerment. I mentor aspiring founders from underrepresented backgrounds.",
    image: "/placeholder.svg?height=100&width=100",
    match: 82,
  },
  {
    id: 4,
    name: "Jordan Taylor",
    role: "DEI Consultant",
    organization: "Equity Partners",
    skills: ["DEI Strategy", "Workshop Facilitation", "Change Management"],
    interests: ["LGBTQ+ Inclusion", "Intersectionality", "Workplace Culture"],
    bio: "Non-binary consultant specializing in creating inclusive workplaces. I help mentees navigate identity challenges and advocate for systemic change.",
    image: "/placeholder.svg?height=100&width=100",
    match: 79,
  },
]


setStorageValue("mentorProfiles", mentorProfiles)

async function findMentorMatches(profile: any) {
 
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return mentorProfiles.sort(() => 0.5 - Math.random())
}

export function MentorshipConnect() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [matches, setMatches] = useState<any[]>([])
  const [profile, setProfile] = useState({
    role: "mentee", 
    name: "",
    email: "",
    gender: "",
    background: "",
    skills: [],
    interests: [],
    goals: "",
    preferences: {
      genderPreference: false,
      backgroundPreference: false,
    },
  })

  const handleProfileChange = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePreferenceChange = (field: string, value: boolean) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  const handleFindMatches = async () => {
    setIsLoading(true)
    try {
      const matchResults = await findMentorMatches(profile)

      setStorageValue("mentorshipMatches", matchResults)

      setMatches(matchResults)
      setActiveTab("matches")
    } catch (error) {
      console.error("Error finding matches:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = (mentorId: number) => {
    alert(`Connection request sent to mentor #${mentorId}`)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Your Profile</TabsTrigger>
          <TabsTrigger value="matches" disabled={matches.length === 0 && !isLoading}>
            Matches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="role">I am looking to be a:</Label>
              <Select value={profile.role} onValueChange={(value) => handleProfileChange("role", value)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mentee">Mentee (seeking guidance)</SelectItem>
                  <SelectItem value="mentor">Mentor (offering guidance)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  placeholder="Your email address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="gender">Gender Identity (Optional)</Label>
                <Select value={profile.gender} onValueChange={(value) => handleProfileChange("gender", value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender identity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="woman">Woman</SelectItem>
                    <SelectItem value="man">Man</SelectItem>
                    <SelectItem value="non-binary">Non-binary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="background">Background (Optional)</Label>
                <Select value={profile.background} onValueChange={(value) => handleProfileChange("background", value)}>
                  <SelectTrigger id="background">
                    <SelectValue placeholder="Select background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black/African American</SelectItem>
                    <SelectItem value="hispanic">Hispanic/Latino</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="indigenous">Indigenous/Native</SelectItem>
                    <SelectItem value="white">White/Caucasian</SelectItem>
                    <SelectItem value="multiracial">Multiracial</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="skills">Skills (Select all that apply)</Label>
              <Select onValueChange={(value) => handleProfileChange("skills", [...profile.skills, value])}>
                <SelectTrigger id="skills">
                  <SelectValue placeholder="Add skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="technical">Technical/STEM</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="advocacy">Advocacy</SelectItem>
                  <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                  <SelectItem value="policy">Policy Development</SelectItem>
                </SelectContent>
              </Select>

              {profile.skills.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs">
                      {skill}
                      <button
                        type="button"
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          handleProfileChange(
                            "skills",
                            profile.skills.filter((_, i) => i !== index),
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="interests">Interests (Select all that apply)</Label>
              <Select onValueChange={(value) => handleProfileChange("interests", [...profile.interests, value])}>
                <SelectTrigger id="interests">
                  <SelectValue placeholder="Add interests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gender-equality">Gender Equality</SelectItem>
                  <SelectItem value="social-justice">Social Justice</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                </SelectContent>
              </Select>

              {profile.interests.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <div key={index} className="flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs">
                      {interest}
                      <button
                        type="button"
                        className="ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          handleProfileChange(
                            "interests",
                            profile.interests.filter((_, i) => i !== index),
                          )
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="goals">Goals & Expectations</Label>
              <Textarea
                id="goals"
                value={profile.goals}
                onChange={(e) => handleProfileChange("goals", e.target.value)}
                placeholder="What do you hope to achieve through mentorship?"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Matching Preferences</Label>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="genderPreference"
                  checked={profile.preferences.genderPreference}
                  onCheckedChange={(checked) => handlePreferenceChange("genderPreference", checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="genderPreference"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Match with someone of the same gender identity (if provided)
                  </label>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="backgroundPreference"
                  checked={profile.preferences.backgroundPreference}
                  onCheckedChange={(checked) => handlePreferenceChange("backgroundPreference", checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="backgroundPreference"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Match with someone of a similar background (if provided)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleFindMatches} disabled={isLoading || !profile.name || !profile.email}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finding Matches
                </>
              ) : (
                "Find Matches"
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Recommended Matches</h3>
            <p className="text-sm text-muted-foreground">
              Our AI has analyzed your profile and found these potential mentors based on your skills, interests, and
              preferences.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {matches.map((mentor) => (
                <Card key={mentor.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-start gap-4 md:flex-row">
                      <div className="flex-shrink-0">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full">
                          <UserCircle className="h-20 w-20 text-muted-foreground" />
                        </div>
                        <div className="mt-2 text-center">
                          <span className="inline-block rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                            {mentor.match}% Match
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="font-medium">{mentor.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {mentor.role} at {mentor.organization}
                          </p>
                        </div>

                        <p className="text-sm">{mentor.bio}</p>

                        <div>
                          <h5 className="text-xs font-medium">Skills</h5>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {mentor.skills.map((skill, index) => (
                              <span key={index} className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="text-xs font-medium">Interests</h5>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {mentor.interests.map((interest, index) => (
                              <span key={index} className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full flex-shrink-0 justify-end md:w-auto">
                        <Button onClick={() => handleConnect(mentor.id)}>Connect</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setActiveTab("profile")}>
              Back to Profile
            </Button>
            <Button onClick={() => window.location.reload()}>Start Over</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
