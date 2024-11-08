'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { ChevronLeft, Compass, Table } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SecondNavbar() {
  const pathname = usePathname()
  const { id } = useParams()

  const navItems = [
    { href: '/preparation', icon: Table, label: 'Preparation' },
    { href: '/explore', icon: Compass, label: 'Explore' },
  ]

  const NavLink = ({ href, icon: Icon, label }) => {
    const isActive = pathname.endsWith(href)
    return (
      <Link
        href={`/project/${id}${href}`}
        className={cn(
          "flex items-center space-x-2 text-sm md:text-base font-medium",
          isActive 
            ? "text-blue-600 hover:text-blue-700" 
            : "text-muted-foreground hover:text-primary"
        )}
      >
        <Icon className={cn(
          "h-4 w-4 md:h-5 md:w-5",
          isActive ? "text-blue-600" : "text-muted-foreground"
        )} />
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <nav className="h-12 flex items-center justify-between px-4 py-2">
      <div className="md:hidden">
        <Link
          href="/project"
          className="flex items-center text-muted-foreground hover:text-primary"
          aria-label="Go back to projects"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      </div>

      <div className="hidden md:block">
        <Link
          href="/project"
          className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
          aria-label="Go back to projects"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="flex space-x-4 md:space-x-6">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </div>
      </div>

      {/* Empty div to maintain layout balance on larger screens */}
      <div className="hidden md:block w-[57px]"></div>
    </nav>
  );
}
