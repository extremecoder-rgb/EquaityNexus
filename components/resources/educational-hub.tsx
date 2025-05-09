"use client"

import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select, SelectItem } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Video, FileText, Globe, Download } from "lucide-react"
import { setStorageValue } from "@/lib/async-storage"
import { useSearchParams } from "next/navigation"


const resourcesData = {
  articles: [
    {
      id: 1,
      title: "Understanding Intersectionality in Gender Equality",
      description:
        "An in-depth exploration of how different aspects of identity intersect in experiences of discrimination.",
      author: "Dr. Maya Johnson",
      date: "2023-05-15",
      readTime: "12 min",
      tags: ["gender-equality", "intersectionality", "sdg5"],
      languages: ["English", "Spanish", "French"],
      url: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Policy Frameworks for Inclusive Workplaces",
      description: "A comprehensive guide to developing and implementing inclusive workplace policies.",
      author: "Carlos Rodriguez",
      date: "2023-07-22",
      readTime: "15 min",
      tags: ["workplace-inclusion", "policy", "sdg10"],
      languages: ["English", "French", "Arabic"],
      url: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Gender Pay Gap: Global Trends and Solutions",
      description: "Analysis of current global wage gap data with actionable solutions for organizations.",
      author: "Aisha Patel",
      date: "2023-09-10",
      readTime: "10 min",
      tags: ["gender-pay-gap", "economic-equality", "sdg5", "sdg10"],
      languages: ["English", "Chinese", "Spanish"],
      url: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  videos: [
    {
      id: 1,
      title: "Breaking the Glass Ceiling: Women in Leadership",
      description: "A documentary exploring the challenges and successes of women in leadership positions globally.",
      creator: "Global Equality Initiative",
      date: "2023-06-05",
      duration: "28:45",
      tags: ["leadership", "women-empowerment", "sdg5"],
      languages: ["English", "Spanish", "French", "Arabic", "Chinese"],
      transcriptAvailable: true,
      url: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Inclusive Design: Building for Everyone",
      description: "How inclusive design principles can reduce inequality in physical and digital spaces.",
      creator: "Design for All Foundation",
      date: "2023-08-12",
      duration: "22:18",
      tags: ["inclusive-design", "accessibility", "sdg10"],
      languages: ["English", "French", "Spanish"],
      transcriptAvailable: true,
      url: "#",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ],
  courses: [
    {
      id: 1,
      title: "Gender Mainstreaming in Policy Development",
      description: "A comprehensive course on integrating gender perspectives into policy frameworks.",
      provider: "UN Women Academy",
      duration: "6 weeks",
      effort: "3-4 hours/week",
      tags: ["policy", "gender-mainstreaming", "sdg5"],
      languages: ["English", "French", "Spanish", "Arabic"],
      certification: true,
      url: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Diversity & Inclusion in the Workplace",
      description: "Practical strategies for creating and maintaining inclusive workplace environments.",
      provider: "Global Inclusion Institute",
      duration: "4 weeks",
      effort: "2-3 hours/week",
      tags: ["workplace", "diversity", "inclusion", "sdg10"],
      languages: ["English", "Spanish", "Chinese"],
      certification: true,
      url: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  toolkits: [
    {
      id: 1,
      title: "Inclusive Policy Development Toolkit",
      description: "Step-by-step guide for creating inclusive policies for organizations of all sizes.",
      creator: "Equality Partners",
      date: "2023-04-18",
      pages: 45,
      tags: ["policy", "toolkit", "sdg10"],
      languages: ["English", "French", "Spanish", "Arabic", "Chinese"],
      url: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Gender-Responsive Budgeting Guide",
      description: "Practical tools for implementing gender-responsive budgeting in organizations and governments.",
      creator: "UN Women",
      date: "2023-02-28",
      pages: 62,
      tags: ["budgeting", "gender-equality", "sdg5"],
      languages: ["English", "French", "Spanish"],
      url: "#",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
}


setStorageValue("educationalResources", resourcesData)

async function translateResource(resource: any, targetLanguage: string) {

  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    ...resource,
    title: `[${targetLanguage}] ${resource.title}`,
    description: `[${targetLanguage}] ${resource.description}`,
  }
}

export function EducationalHub() {
  const searchParams = useSearchParams()
  const sdgFilter = searchParams.get("sdg")

  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [resources, setResources] = useState<any>(null)
  const [filteredResources, setFilteredResources] = useState<any>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    
    setResources(resourcesData)
    setFilteredResources(resourcesData)
  }, [])

  useEffect(() => {
    if (resources && sdgFilter) {
      filterResourcesBySDG(sdgFilter)
    }
  }, [resources, sdgFilter])

  const filterResourcesBySDG = (sdg: string) => {
    if (!resources) return

    const sdgTag = `sdg${sdg}`

    const filtered = {
      articles: resources.articles.filter((article: any) => article.tags.includes(sdgTag)),
      videos: resources.videos.filter((video: any) => video.tags.includes(sdgTag)),
      courses: resources.courses.filter((course: any) => course.tags.includes(sdgTag)),
      toolkits: resources.toolkits.filter((toolkit: any) => toolkit.tags.includes(sdgTag)),
    }

    setFilteredResources(filtered)
    setActiveTab("all")
  }

  const handleSearch = () => {
    if (!resources) return

    if (!searchQuery.trim()) {
      setFilteredResources(resources)
      return
    }

    const query = searchQuery.toLowerCase()

    const filtered = {
      articles: resources.articles.filter(
        (article: any) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.tags.some((tag: string) => tag.toLowerCase().includes(query)),
      ),
      videos: resources.videos.filter(
        (video: any) =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.tags.some((tag: string) => tag.toLowerCase().includes(query)),
      ),
      courses: resources.courses.filter(
        (course: any) =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.tags.some((tag: string) => tag.toLowerCase().includes(query)),
      ),
      toolkits: resources.toolkits.filter(
        (toolkit: any) =>
          toolkit.title.toLowerCase().includes(query) ||
          toolkit.description.toLowerCase().includes(query) ||
          toolkit.tags.some((tag: string) => tag.toLowerCase().includes(query)),
      ),
    }

    setFilteredResources(filtered)
    setActiveTab("all")
  }

  const handleLanguageChange = async (resource: any, language: string) => {
    if (language === "English" || !resource) return

    setIsTranslating(true)
    try {
      const translatedResource = await translateResource(resource, language)

      
      alert(`Resource would be translated to ${language}`)
    } catch (error) {
      console.error("Error translating resource:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  if (!resources || !filteredResources) {
    return <div>Loading resources...</div>
  }

  const allResources = [
    ...filteredResources.articles,
    ...filteredResources.videos,
    ...filteredResources.courses,
    ...filteredResources.toolkits,
  ]

  const renderResourceCard = (resource: any, type: string) => {
    const resourceTypeIcon = {
      article: <BookOpen className="h-4 w-4" />,
      video: <Video className="h-4 w-4" />,
      course: <FileText className="h-4 w-4" />,
      toolkit: <Download className="h-4 w-4" />,
    }[type]

    return (
      <Card key={`${type}-${resource.id}`} className="overflow-hidden">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img src={resource.image || resource.thumbnail} alt={resource.title} className="h-full w-full object-cover" />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="flex items-center gap-1">
              {resourceTypeIcon}
              <span className="capitalize">{type}</span>
            </Badge>
            {resource.languages && (
              <Select
                value={selectedLanguage}
                onValueChange={(language) => handleLanguageChange(resource, language)}
                disabled={isTranslating}
              >
                <SelectTrigger className="h-7 w-[130px]">
                  <Globe className="mr-1 h-3 w-3" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {resource.languages.map((language: string) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
          <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {resource.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag.replace(/-/g, " ")}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {type === "article" && `${resource.readTime} read`}
            {type === "video" && resource.duration}
            {type === "course" && resource.duration}
            {type === "toolkit" && `${resource.pages} pages`}
          </div>
          <Button size="sm" asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Access
            </a>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="toolkits">Toolkits</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {allResources.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.articles.map((resource: any) => renderResourceCard(resource, "article"))}
              {filteredResources.videos.map((resource: any) => renderResourceCard(resource, "video"))}
              {filteredResources.courses.map((resource: any) => renderResourceCard(resource, "course"))}
              {filteredResources.toolkits.map((resource: any) => renderResourceCard(resource, "toolkit"))}
            </div>
          ) : (
            <div className="rounded-md bg-muted p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          {filteredResources.articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.articles.map((resource: any) => renderResourceCard(resource, "article"))}
            </div>
          ) : (
            <div className="rounded-md bg-muted p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          {filteredResources.videos.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.videos.map((resource: any) => renderResourceCard(resource, "video"))}
            </div>
          ) : (
            <div className="rounded-md bg-muted p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No videos found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          {filteredResources.courses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.courses.map((resource: any) => renderResourceCard(resource, "course"))}
            </div>
          ) : (
            <div className="rounded-md bg-muted p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="toolkits" className="space-y-6">
          {filteredResources.toolkits.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.toolkits.map((resource: any) => renderResourceCard(resource, "toolkit"))}
            </div>
          ) : (
            <div className="rounded-md bg-muted p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No toolkits found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
