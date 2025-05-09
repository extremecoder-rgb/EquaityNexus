import { DiscriminationReportForm } from "@/components/report/discrimination-report-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">Anonymous Discrimination Reporting</h1>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          Securely report incidents of discrimination with optional NGO follow-up.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Report an Incident</CardTitle>
            <CardDescription>
              All reports are anonymous and encrypted. You control who can access your information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DiscriminationReportForm />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Privacy & Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  Your report is encrypted and can only be accessed by authorized NGO partners if you choose to share
                  it.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Anonymous Reporting</h3>
                <p className="text-sm text-muted-foreground">
                  No personally identifiable information is required unless you choose to provide it.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Secure Storage</h3>
                <p className="text-sm text-muted-foreground">
                  Reports are stored securely and only accessible to authorized personnel.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">NGO Support</p>
                <p className="text-xs text-muted-foreground">
                  If you opt for NGO follow-up, a partner organization will contact you through your chosen method.
                </p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Data Aggregation</p>
                <p className="text-xs text-muted-foreground">
                  Anonymous data helps identify patterns of discrimination to inform policy changes.
                </p>
              </div>
              <div className="rounded-md bg-muted p-3">
                <p className="text-sm font-medium">Resources</p>
                <p className="text-xs text-muted-foreground">
                  You'll receive resources relevant to your situation, regardless of follow-up choice.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
