import Link from 'next/link'
import { Nav } from './Nav'

export function Header() {
  return (
    <header className="header wrap">
      <Link href="/" className="logo" aria-label="Lambda Technologies home">
        <span className="logo-mark" aria-hidden="true">λ</span>lambda
      </Link>
      <Nav />
    </header>
  )
}
