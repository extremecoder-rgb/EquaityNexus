import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Equality Nexus</h3>
            <p className="text-sm text-muted-foreground">
              Combating gender inequality and social exclusion through technology and community empowerment.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/bias-scanner" className="text-muted-foreground hover:text-foreground">
                  Bias Scanner
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-muted-foreground hover:text-foreground">
                  Mentorship Connect
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                  Educational Hub
                </Link>
              </li>
              <li>
                <Link href="/report" className="text-muted-foreground hover:text-foreground">
                  Report Discrimination
                </Link>
              </li>
              <li>
                <Link href="/ngo-portal" className="text-muted-foreground hover:text-foreground">
                  NGO Portal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">SDG Alignment</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://sdgs.un.org/goals/goal5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  SDG 5: Gender Equality
                </a>
              </li>
              <li>
                <a
                  href="https://sdgs.un.org/goals/goal10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  SDG 10: Reduced Inequalities
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Equality Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
