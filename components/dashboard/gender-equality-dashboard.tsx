"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, ChartContainer, ChartTooltip, ChartLegend } from "@/components/ui/chart"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { setStorageValue } from "@/lib/async-storage"


const genderEqualityData = {
  wageGap: {
    global: [
      { year: "2018", gap: 23 },
      { year: "2019", gap: 22 },
      { year: "2020", gap: 21 },
      { year: "2021", gap: 20 },
      { year: "2022", gap: 19 },
      { year: "2023", gap: 18 },
    ],
    regions: [
      { name: "North America", gap: 18 },
      { name: "Europe", gap: 16 },
      { name: "Asia", gap: 22 },
      { name: "Africa", gap: 26 },
      { name: "South America", gap: 21 },
      { name: "Oceania", gap: 15 },
    ],
  },
  leadershipRoles: {
    sectors: [
      { name: "Corporate", women: 28, men: 72 },
      { name: "Government", women: 32, men: 68 },
      { name: "Education", women: 45, men: 55 },
      { name: "NGOs", women: 52, men: 48 },
      { name: "Technology", women: 24, men: 76 },
    ],
    trends: [
      { year: "2018", percentage: 22 },
      { year: "2019", percentage: 24 },
      { year: "2020", percentage: 26 },
      { year: "2021", percentage: 29 },
      { year: "2022", percentage: 32 },
      { year: "2023", percentage: 35 },
    ],
  },
  educationAccess: {
    global: [
      { level: "Primary", female: 89, male: 92 },
      { level: "Secondary", female: 76, male: 82 },
      { level: "Tertiary", female: 41, male: 43 },
    ],
    regions: [
      { name: "North America", female: 92, male: 91 },
      { name: "Europe", female: 94, male: 93 },
      { name: "Asia", female: 82, male: 87 },
      { name: "Africa", female: 68, male: 76 },
      { name: "South America", female: 85, male: 83 },
      { name: "Oceania", female: 93, male: 92 },
    ],
  },
}


setStorageValue("genderEqualityData", genderEqualityData)

export function GenderEqualityDashboard() {
  const { theme } = useTheme()
  const [data, setData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("wage-gap")

  useEffect(() => {
   
    setData(genderEqualityData)
  }, [])

  if (!data) {
    return <div>Loading dashboard data...</div>
  }

  const chartColors = {
    female: "#8884d8",
    male: "#82ca9d",
    gap: "#8884d8",
    women: "#8884d8",
    men: "#82ca9d",
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="wage-gap" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="wage-gap">Wage Gap</TabsTrigger>
          <TabsTrigger value="leadership">Leadership Roles</TabsTrigger>
          <TabsTrigger value="education">Education Access</TabsTrigger>
        </TabsList>

        <TabsContent value="wage-gap" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Global Wage Gap Trend</CardTitle>
                <CardDescription>Percentage difference in average earnings between men and women</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer height={300} className="w-full">
                  <LineChart
                    data={data.wageGap.global}
                    index="year"
                    categories={["gap"]}
                    colors={["#8884d8"]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                  <ChartTooltip />
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Wage Gap Comparison</CardTitle>
                <CardDescription>Current wage gap percentages across different regions</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer height={300} className="w-full">
                  <BarChart
                    data={data.wageGap.regions}
                    index="name"
                    categories={["gap"]}
                    colors={["#8884d8"]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                  <ChartTooltip />
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leadership" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Women in Leadership by Sector</CardTitle>
                <CardDescription>Percentage of leadership positions held by women across sectors</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer height={300} className="w-full">
                  <BarChart
                    data={data.leadershipRoles.sectors}
                    index="name"
                    categories={["women", "men"]}
                    colors={[chartColors.women, chartColors.men]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={true}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                    layout="vertical"
                    stack={true}
                  />
                  <ChartTooltip />
                  <ChartLegend />
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Women in Leadership Trend</CardTitle>
                <CardDescription>Global trend of women in leadership positions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer height={300} className="w-full">
                  <LineChart
                    data={data.leadershipRoles.trends}
                    index="year"
                    categories={["percentage"]}
                    colors={["#8884d8"]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={false}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                  <ChartTooltip />
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Global Education Access by Level</CardTitle>
                <CardDescription>Percentage of males and females with access to education by level</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer height={300} className="w-full">
                  <BarChart
                    data={data.educationAccess.global}
                    index="level"
                    categories={["female", "male"]}
                    colors={[chartColors.female, chartColors.male]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={true}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                  <ChartTooltip />
                  <ChartLegend />
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Tertiary Education Access</CardTitle>
                <CardDescription>
                  Percentage of males and females with access to tertiary education by region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer height={300} className="w-full">
                  <BarChart
                    data={data.educationAccess.regions}
                    index="name"
                    categories={["female", "male"]}
                    colors={[chartColors.female, chartColors.male]}
                    valueFormatter={(value) => `${value}%`}
                    showLegend={true}
                    showXAxis={true}
                    showYAxis={true}
                    showGridLines={true}
                  />
                  <ChartTooltip />
                  <ChartLegend />
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
