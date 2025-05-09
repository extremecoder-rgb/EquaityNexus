"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, FileText, Users } from "lucide-react"
import { setStorageValue } from "@/lib/async-storage"


async function authenticateNGO(credentials: { email: string; accessCode: string }) {
  
  await new Promise((resolve) => setTimeout(resolve, 1500))


  if (!credentials.email || !credentials.accessCode) {
    return { success: false, message: "Invalid credentials" }
  }

  return {
    success: true,
    ngoName: "Global Equality Initiative",
    accessLevel: "Full",
  }
}


const reportsData = [
  {
    id: "REP-2023-001",
    type: "gender",
    date: "2023-10-15",
    location: "Tech Company XYZ",
    status: "New",
    summary:
      "Gender-based discrimination in hiring practices. Multiple qualified female candidates rejected for senior roles.",
    followUpRequested: true,
    assignedTo: null,
  },
  {
    id: "REP-2023-002",
    type: "racial",
    date: "2023-10-12",
    location: "University ABC",
    status: "In Progress",
    summary: "Racial discrimination in academic advancement opportunities. Systematic barriers identified.",
    followUpRequested: true,
    assignedTo: "Equality Now",
  },
  {
    id: "REP-2023-003",
    type: "lgbtq",
    date: "2023-10-08",
    location: "Government Agency DEF",
    status: "Resolved",
    summary:
      "Discrimination against LGBTQ+ employees in benefits allocation. Policy changes implemented after intervention.",
    followUpRequested: true,
    assignedTo: "Human Rights Watch",
  },
  {
    id: "REP-2023-004",
    type: "disability",
    date: "2023-10-05",
    location: "Retail Chain GHI",
    status: "New",
    summary: "Lack of reasonable accommodations for employees with disabilities. Multiple incidents reported.",
    followUpRequested: false,
    assignedTo: null,
  },
]


const resourcesData = [
  {
    id: 1,
    title: "Gender Equality Policy Template",
    type: "Template",
    organization: "UN Women",
    date: "2023-09-20",
    description: "Comprehensive template for developing gender equality policies in various organizational contexts.",
    url: "#",
  },
  {
    id: 2,
    title: "Discrimination Response Protocol",
    type: "Guide",
    organization: "Human Rights Watch",
    date: "2023-08-15",
    description: "Step-by-step protocol for responding to discrimination reports in a trauma-informed manner.",
    url: "#",
  },
  {
    id: 3,
    title: "Inclusive Language Guidelines",
    type: "Toolkit",
    organization: "Amnesty International",
    date: "2023-07-10",
    description: "Comprehensive guide to using inclusive language across different contexts and communities.",
    url: "#",
  },
]


const collaborationsData = [
  {
    id: 1,
    title: "Global Gender Equality Summit 2024",
    type: "Event",
    lead: "UN Women",
    date: "2024-03-15",
    description:
      "Annual summit bringing together NGOs, policymakers, and advocates to advance gender equality globally.",
    participants: ["UN Women", "Equality Now", "Global Equality Initiative", "Human Rights Watch"],
    status: "Planning",
  },
  {
    id: 2,
    title: "Inclusive Workplace Certification Program",
    type: "Initiative",
    lead: "Global Equality Initiative",
    date: "Ongoing",
    description:
      "Collaborative certification program for organizations demonstrating commitment to inclusive practices.",
    participants: ["Global Equality Initiative", "Amnesty International", "Diversity Alliance"],
    status: "Active",
  },
  {
    id: 3,
    title: "Policy Advocacy Coalition for SDG 5 & 10",
    type: "Coalition",
    lead: "Human Rights Watch",
    date: "Ongoing",
    description:
      "Coalition of NGOs advocating for policy changes aligned with SDG 5 and SDG 10 at national and international levels.",
    participants: ["Human Rights Watch", "Equality Now", "UN Women", "Global Equality Initiative"],
    status: "Active",
  },
]


setStorageValue("ngoReports", reportsData)
setStorageValue("ngoResources", resourcesData)
setStorageValue("ngoCollaborations", collaborationsData)

export function NGOCollaborationPortal() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authError, setAuthError] = useState("")
  const [ngoInfo, setNgoInfo] = useState<{ name: string; accessLevel: string } | null>(null)
  const [credentials, setCredentials] = useState({ email: "", accessCode: "" })
  const [activeTab, setActiveTab] = useState("reports")

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAuthenticating(true)
    setAuthError("")

    try {
      const result = await authenticateNGO(credentials)
      if (result.success) {
        setIsAuthenticated(true)
        setNgoInfo({ name: result.ngoName, accessLevel: result.accessLevel })
      } else {
        setAuthError(result.message)
      }
    } catch (error) {
      setAuthError("Authentication failed. Please try again.")
      console.error("Authentication error:", error)
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleAssignReport = (reportId: string) => {
    
    alert(`Report ${reportId} assigned to ${ngoInfo?.name}`)
  }

  const handleShareResource = () => {
   
    alert("Resource sharing functionality would be implemented here")
  }

  const handleJoinCollaboration = (collaborationId: number) => {
    
    alert(`Joined collaboration #${collaborationId}`)
  }

  if (!isAuthenticated) {
    return (
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>NGO Portal Access</CardTitle>
            <CardDescription>
              Enter your NGO email and access code to collaborate on discrimination reports and resources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuthenticate} className="space-y-4">
              {authError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Error</AlertTitle>
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  NGO Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="your-ngo@example.org"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="accessCode" className="text-sm font-medium">
                  Access Code
                </label>
                <Input
                  id="accessCode"
                  type="password"
                  value={credentials.accessCode}
                  onChange={(e) => setCredentials({ ...credentials, accessCode: e.target.value })}
                  placeholder="Enter your access code"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isAuthenticating}>
                {isAuthenticating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Authenticating
                  </>
                ) : (
                  "Access Portal"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Don't have access? Contact{" "}
            <a href="mailto:support@equalitynexus.org" className="underline hover:text-foreground">
              support@equalitynexus.org
            </a>{" "}
            to register your NGO.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-lg border p-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold">{ngoInfo?.name}</h2>
          <p className="text-sm text-muted-foreground">Access Level: {ngoInfo?.accessLevel}</p>
        </div>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
          Sign Out
        </Button>
      </div>

      <Tabs defaultValue="reports" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">
            <FileText className="mr-2 h-4 w-4" /> Reports
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText className="mr-2 h-4 w-4" /> Resources
          </TabsTrigger>
          <TabsTrigger value="collaborations">
            <Users className="mr-2 h-4 w-4" /> Collaborations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Discrimination Reports</h3>
            <div className="text-sm text-muted-foreground">Showing {reportsData.length} reports</div>
          </div>

          <div className="space-y-4">
            {reportsData.map((report) => (
              <Card key={report.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{report.id}</CardTitle>
                      <Badge
                        variant={
                          report.status === "New"
                            ? "default"
                            : report.status === "In Progress"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {report.type}
                    </Badge>
                  </div>
                  <CardDescription>
                    Reported on {report.date} • {report.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{report.summary}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {report.followUpRequested ? (
                        <Badge
                          variant="outline"
                          className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                        >
                          Follow-up Requested
                        </Badge>
                      ) : (
                        <Badge variant="outline">No Follow-up Needed</Badge>
                      )}

                      {report.assignedTo && (
                        <div className="text-xs text-muted-foreground">Assigned to: {report.assignedTo}</div>
                      )}
                    </div>

                    {!report.assignedTo && report.followUpRequested && (
                      <Button size="sm" onClick={() => handleAssignReport(report.id)}>
                        Assign to My NGO
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Shared Resources</h3>
            <Button onClick={handleShareResource}>Share Resource</Button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourcesData.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.type}</Badge>
                    <div className="text-xs text-muted-foreground">{resource.date}</div>
                  </div>
                  <CardTitle className="line-clamp-1 text-base">{resource.title}</CardTitle>
                  <CardDescription>{resource.organization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm">{resource.description}</p>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Access Resource
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collaborations" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">NGO Collaborations</h3>
            <Button>Propose Collaboration</Button>
          </div>

          <div className="space-y-4">
            {collaborationsData.map((collab) => (
              <Card key={collab.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{collab.type}</Badge>
                    <Badge
                      variant={
                        collab.status === "Active" ? "default" : collab.status === "Planning" ? "outline" : "secondary"
                      }
                    >
                      {collab.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{collab.title}</CardTitle>
                  <CardDescription>
                    Led by {collab.lead} • {collab.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{collab.description}</p>

                  <div>
                    <h4 className="mb-1 text-xs font-medium">Participating Organizations</h4>
                    <div className="flex flex-wrap gap-1">
                      {collab.participants.map((org, index) => (
                        <Badge key={index} variant="secondary">
                          {org}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {collab.participants.includes(ngoInfo?.name || "") ? (
                      <Button size="sm" variant="outline" disabled>
                        Already Participating
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleJoinCollaboration(collab.id)}>
                        Join Collaboration
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
