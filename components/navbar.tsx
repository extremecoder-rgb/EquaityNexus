"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const { setTheme, theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Equality Nexus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/bias-scanner" className="text-sm font-medium hover:text-primary">
              Bias Scanner
            </Link>
            <Link href="/mentorship" className="text-sm font-medium hover:text-primary">
              Mentorship Connect
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary">
              Educational Hub
            </Link>
            <Link href="/report" className="text-sm font-medium hover:text-primary">
              Report Discrimination
            </Link>
            <Link href="/ngo-portal" className="text-sm font-medium hover:text-primary">
              NGO Portal
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-4 space-y-4 pb-4 md:hidden">
            <Link
              href="/"
              className="block text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/bias-scanner"
              className="block text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Bias Scanner
            </Link>
            <Link
              href="/mentorship"
              className="block text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Mentorship Connect
            </Link>
            <Link
              href="/resources"
              className="block text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Educational Hub
            </Link>
            <Link
              href="/report"
              className="block text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Report Discrimination
            </Link>
            <Link
              href="/ngo-portal"
              className="block text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              NGO Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
