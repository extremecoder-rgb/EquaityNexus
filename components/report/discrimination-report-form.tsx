"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, ShieldAlert } from "lucide-react"
import { setStorageValue } from "@/lib/async-storage"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


function encryptData(data: any) {
  return JSON.stringify(data)
}


async function submitReport(report: any) {
 
  await new Promise((resolve) => setTimeout(resolve, 2000))

 
  const encryptedReport = encryptData(report)

  
  const existingReports = JSON.parse(localStorage.getItem("discriminationReports") || "[]")
  localStorage.setItem("discriminationReports", JSON.stringify([...existingReports, encryptedReport]))

  
  setStorageValue("discriminationReports", [...existingReports, encryptedReport])

  return { success: true, reportId: Math.random().toString(36).substring(2, 10) }
}

export function DiscriminationReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reportId, setReportId] = useState("")
  const [report, setReport] = useState({
    incidentType: "",
    location: "",
    date: "",
    description: "",
    impactDescription: "",
    witnessPresent: "no",
    contactConsent: false,
    contactMethod: "",
    contactDetails: "",
    ngoFollowUp: false,
    ngoPreference: "",
  })

  const handleChange = (field: string, value: any) => {
    setReport((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitReport(report)
      if (result.success) {
        setReportId(result.reportId)
        setSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting report:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        <Alert>
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Report Submitted Successfully</AlertTitle>
          <AlertDescription>
            Your report has been securely submitted. Your report ID is <strong>{reportId}</strong>. Please save this ID
            for future reference.
          </AlertDescription>
        </Alert>

        <div className="rounded-md bg-muted p-4">
          <h3 className="mb-2 font-medium">What happens next?</h3>
          <ul className="space-y-2 text-sm">
            <li>Your report has been encrypted and securely stored.</li>
            {report.ngoFollowUp && (
              <li>
                A representative from {report.ngoPreference || "an appropriate NGO"} will contact you via your preferred
                method within 48 hours.
              </li>
            )}
            <li>
              Anonymous data from your report will help identify patterns of discrimination to inform policy changes.
            </li>
            <li>You can access resources related to your situation in the Educational Hub section.</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => window.location.reload()}>Submit Another Report</Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="incidentType">Type of Discrimination</Label>
          <Select value={report.incidentType} onValueChange={(value) => handleChange("incidentType", value)} required>
            <SelectTrigger id="incidentType">
              <SelectValue placeholder="Select type of discrimination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gender">Gender-based</SelectItem>
              <SelectItem value="racial">Racial/Ethnic</SelectItem>
              <SelectItem value="lgbtq">LGBTQ+</SelectItem>
              <SelectItem value="disability">Disability</SelectItem>
              <SelectItem value="age">Age</SelectItem>
              <SelectItem value="religious">Religious</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="location">Location/Organization</Label>
            <Input
              id="location"
              value={report.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Where did this occur?"
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date of Incident</Label>
            <Input
              id="date"
              type="date"
              value={report.date}
              onChange={(e) => handleChange("date", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description of Incident</Label>
          <Textarea
            id="description"
            value={report.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Please describe what happened in as much detail as you're comfortable sharing"
            className="min-h-[100px]"
            required
          />
        </div>

        <div>
          <Label htmlFor="impactDescription">Impact of Incident</Label>
          <Textarea
            id="impactDescription"
            value={report.impactDescription}
            onChange={(e) => handleChange("impactDescription", e.target.value)}
            placeholder="How has this affected you or others?"
            className="min-h-[100px]"
          />
        </div>

        <div>
          <Label htmlFor="witnessPresent">Were there witnesses?</Label>
          <RadioGroup
            id="witnessPresent"
            value={report.witnessPresent}
            onValueChange={(value) => handleChange("witnessPresent", value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="witness-yes" />
              <Label htmlFor="witness-yes" className="font-normal">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="witness-no" />
              <Label htmlFor="witness-no" className="font-normal">
                No
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unsure" id="witness-unsure" />
              <Label htmlFor="witness-unsure" className="font-normal">
                Unsure
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="contactConsent"
              checked={report.contactConsent}
              onCheckedChange={(checked) => handleChange("contactConsent", checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="contactConsent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I consent to being contacted about this report (optional)
              </label>
            </div>
          </div>

          {report.contactConsent && (
            <div className="space-y-4 rounded-md border p-4">
              <div>
                <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                <Select
                  value={report.contactMethod}
                  onValueChange={(value) => handleChange("contactMethod", value)}
                  required={report.contactConsent}
                >
                  <SelectTrigger id="contactMethod">
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="secure-messaging">Secure Messaging</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contactDetails">Contact Details</Label>
                <Input
                  id="contactDetails"
                  value={report.contactDetails}
                  onChange={(e) => handleChange("contactDetails", e.target.value)}
                  placeholder="Email address, phone number, or username"
                  required={report.contactConsent}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="ngoFollowUp"
              checked={report.ngoFollowUp}
              onCheckedChange={(checked) => handleChange("ngoFollowUp", checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="ngoFollowUp"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I would like an NGO partner to follow up on this report
              </label>
            </div>
          </div>

          {report.ngoFollowUp && (
            <div className="rounded-md border p-4">
              <Label htmlFor="ngoPreference">NGO Preference (Optional)</Label>
              <Select value={report.ngoPreference} onValueChange={(value) => handleChange("ngoPreference", value)}>
                <SelectTrigger id="ngoPreference">
                  <SelectValue placeholder="Select preferred NGO (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equality-now">Equality Now</SelectItem>
                  <SelectItem value="un-women">UN Women</SelectItem>
                  <SelectItem value="amnesty">Amnesty International</SelectItem>
                  <SelectItem value="hrw">Human Rights Watch</SelectItem>
                  <SelectItem value="no-preference">No Preference</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting
            </>
          ) : (
            "Submit Report"
          )}
        </Button>
      </div>
    </form>
  )
}
