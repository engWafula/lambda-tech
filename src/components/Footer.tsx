import Link from 'next/link'
import { NAV } from './nav-items'

export function Footer({ heading, email, title }: { heading: string; email: string; title: string }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-title">{heading}</h2>
        <a href={`mailto:${email}`} className="btn btn-ink footer-btn">
          {email} <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="footer-bottom">
        <nav className="footer-links" aria-label="Footer">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div>
          © {new Date().getFullYear()} {title}
        </div>
      </div>
    </footer>
  )
}
