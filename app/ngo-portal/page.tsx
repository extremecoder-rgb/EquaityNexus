import { NGOCollaborationPortal } from "@/components/ngo-portal/ngo-collaboration-portal"

export default function NGOPortalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">NGO Collaboration Portal</h1>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          A platform for NGOs to access reports, collaborate, and share resources.
        </p>
      </div>

      <NGOCollaborationPortal />
    </div>
  )
}
