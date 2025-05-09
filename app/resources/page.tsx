import { EducationalHub } from "@/components/resources/educational-hub"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">Educational Hub</h1>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
          Curated resources on gender equality and social inclusion with accessibility features.
        </p>
      </div>

      <EducationalHub />
    </div>
  )
}
