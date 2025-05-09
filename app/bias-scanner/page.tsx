import { BiasScanner } from "@/components/bias-scanner/bias-scanner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BiasDetectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">AI-Powered Bias Scanner</h1>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          Analyze text for discriminatory patterns and get suggestions for inclusive alternatives.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Scan for Bias</CardTitle>
            <CardDescription>
              Paste job descriptions, policies, or any text to analyze for biased language
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BiasScanner />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">1. Input Text</h3>
                <p className="text-sm text-muted-foreground">
                  Paste your job posting, policy document, or any text you want to analyze.
                </p>
              </div>
              <div>
                <h3 className="font-medium">2. AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our Gemini 1.5 Pro AI model scans for gendered terms, exclusionary language, and subtle bias.
                </p>
              </div>
              <div>
                <h3 className="font-medium">3. Get Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Receive specific suggestions for more inclusive alternatives to biased language.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Biases Detected</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Gendered Language</p>
                <p className="text-xs text-muted-foreground">
                  Terms like "chairman" or "manpower" that unnecessarily gender roles.
                </p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Ageist Terms</p>
                <p className="text-xs text-muted-foreground">
                  Phrases like "digital native" or "young and dynamic" that exclude older workers.
                </p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Cultural Assumptions</p>
                <p className="text-xs text-muted-foreground">
                  Language that assumes specific cultural backgrounds or experiences.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
