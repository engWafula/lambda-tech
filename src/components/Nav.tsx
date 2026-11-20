'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { NAV } from './nav-items'

export function Nav() {
  const pathname = usePathname()
  const menu = useRef<HTMLDetailsElement>(null)
  const active = (href: string) => (pathname === href || pathname.startsWith(href + '/') ? 'page' : undefined)

  // Close the mobile menu after navigating.
  useEffect(() => {
    if (menu.current) menu.current.open = false
  }, [pathname])

  return (
    <>
      <nav className="nav" aria-label="Main">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} aria-current={active(n.href)}>
            {n.label}
          </Link>
        ))}
        <Link href="/contact" className="btn btn-ink btn-sm">
          Start a project
        </Link>
      </nav>
      <details className="menu" ref={menu}>
        <summary>Menu</summary>
        <nav className="menu-panel" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href)}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-ink">
            Start a project
          </Link>
        </nav>
      </details>
    </>
  )
}
