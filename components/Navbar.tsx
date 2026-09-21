'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo" id="navbar-logo">
          Dramafy
        </Link>

        <nav aria-label="Main navigation">
          <ul className="navbar__nav">
            <li>
              <Link href="/" className={pathname === '/' ? 'active' : ''} id="nav-home">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/browse"
                className={pathname.startsWith('/browse') ? 'active' : ''}
                id="nav-browse"
              >
                Jelajahi
              </Link>
            </li>
            <li>
              <Link
                href="/browse?type=MOVIE"
                className={pathname === '/browse' && typeof window !== 'undefined' && window.location.search.includes('type=MOVIE') ? 'active' : ''}
                id="nav-movies"
              >
                Film
              </Link>
            </li>
            <li>
              <Link
                href="/browse?status=ONGOING"
                id="nav-ongoing"
              >
                Sedang Tayang
              </Link>
            </li>
          </ul>
        </nav>

        <div className="navbar__search">
          <form action="/browse" method="get" role="search">
            <div className="search-input-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                id="navbar-search"
                type="search"
                name="q"
                placeholder="Cari drama, film..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Cari drama atau film"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  )
}
