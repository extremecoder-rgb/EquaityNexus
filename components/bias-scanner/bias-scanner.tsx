"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Copy, Loader2 } from "lucide-react"
import { setStorageValue } from "@/lib/async-storage"


async function analyzeTextForBias(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  
  const biasPatterns = [
    { pattern: /\b(chairman|chairmen)\b/gi, suggestion: "chairperson", type: "gendered" },
    { pattern: /\b(manpower|manmade)\b/gi, suggestion: "workforce/staff, artificial/synthetic", type: "gendered" },
    { pattern: /\b(businessman|businessmen)\b/gi, suggestion: "business person", type: "gendered" },
    { pattern: /\b(digital native)\b/gi, suggestion: "tech-savvy", type: "ageist" },
    { pattern: /\b(young and dynamic)\b/gi, suggestion: "energetic and innovative", type: "ageist" },
    { pattern: /\b(cultural fit)\b/gi, suggestion: "values alignment", type: "cultural" },
    { pattern: /\b(he|his|him)\b/gi, suggestion: "they/their/them", type: "gendered" },
    { pattern: /\b(she|her|hers)\b/gi, suggestion: "they/their/them", type: "gendered" },
    { pattern: /\b(guys)\b/gi, suggestion: "team, folks, everyone", type: "gendered" },
  ]

 
  const findings = []
  for (const { pattern, suggestion, type } of biasPatterns) {
    const matches = [...text.matchAll(pattern)]
    for (const match of matches) {
      findings.push({
        original: match[0],
        suggestion,
        type,
        index: match.index,
      })
    }
  }

  
  let improvedText = text

  findings
    .sort((a, b) => (b.index || 0) - (a.index || 0))
    .forEach(({ original, suggestion }) => {
      if (typeof original === "string" && original.index !== undefined) {
        improvedText =
          improvedText.substring(0, original.index) +
          suggestion +
          improvedText.substring(original.index + original.length)
      }
    })


  const groupedFindings = findings.reduce(
    (acc, finding) => {
      if (!acc[finding.type]) {
        acc[finding.type] = []
      }
      acc[finding.type].push(finding)
      return acc
    },
    {} as Record<string, typeof findings>,
  )

  return {
    originalText: text,
    improvedText,
    findings,
    groupedFindings,
    score: findings.length > 0 ? Math.max(0, 100 - findings.length * 10) : 100,
  }
}

export function BiasScanner() {
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("original")
  const [copied, setCopied] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim()) return

    setIsAnalyzing(true)
    try {
      const analysisResults = await analyzeTextForBias(text)

    
      setStorageValue("biasAnalysisResults", analysisResults)

      setResults(analysisResults)
      if (analysisResults.findings.length > 0) {
        setActiveTab("improved")
      }
    } catch (error) {
      console.error("Error analyzing text:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <Textarea
          placeholder="Paste your job description, policy, or any text to analyze for bias..."
          className="min-h-[200px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <Button onClick={handleAnalyze} disabled={isAnalyzing || !text.trim()}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing
              </>
            ) : (
              "Analyze for Bias"
            )}
          </Button>
        </div>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">Analysis Results</h3>
              <div
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  results.score > 80
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : results.score > 50
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                Score: {results.score}/100
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="original">Original Text</TabsTrigger>
              <TabsTrigger value="improved">Improved Text</TabsTrigger>
            </TabsList>
            <TabsContent value="original" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(results.originalText)}>
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="whitespace-pre-wrap">{results.originalText}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="improved" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(results.improvedText)}>
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="whitespace-pre-wrap">{results.improvedText}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {results.findings.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Detected Bias</h3>
              {Object.entries(results.groupedFindings).map(([type, findings]: [string, any]) => (
                <div key={type} className="space-y-2">
                  <h4 className="font-medium capitalize">{type} Language</h4>
                  <div className="rounded-md border p-4">
                    <ul className="space-y-2">
                      {findings.map((finding: any, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
                          <div>
                            <span className="font-medium">"{finding.original}"</span>
                            <span className="text-muted-foreground"> could be replaced with </span>
                            <span className="font-medium">"{finding.suggestion}"</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-md bg-green-50 p-4 dark:bg-green-900">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-400 dark:text-green-300" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200">No bias detected</h3>
                  <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                    <p>
                      Your text appears to use inclusive language. Great job! Continue to be mindful of inclusive
                      language in your communications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
