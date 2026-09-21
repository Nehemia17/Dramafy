'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <Link href="/" className="footer__logo">
              Dramafy
            </Link>
            <p className="footer__desc">
              Platform streaming drama Asia terbaik. Nikmati ribuan judul K-Drama, C-Drama, dan J-Drama favorit kamu kapan saja, di mana saja.
            </p>
          </div>
          <div>
            <h3 className="footer__col-title">Jelajahi</h3>
            <ul className="footer__links">
              <li><Link href="/browse?country=South+Korea">K-Drama</Link></li>
              <li><Link href="/browse?country=China">C-Drama</Link></li>
              <li><Link href="/browse?country=Japan">J-Drama</Link></li>
              <li><Link href="/browse?type=MOVIE">Film</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer__col-title">Status</h3>
            <ul className="footer__links">
              <li><Link href="/browse?status=ONGOING">Sedang Tayang</Link></li>
              <li><Link href="/browse?status=COMPLETED">Selesai</Link></li>
              <li><Link href="/browse?status=UPCOMING">Segera Hadir</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer__col-title">Genre</h3>
            <ul className="footer__links">
              <li><Link href="/browse?genre=romance">Romance</Link></li>
              <li><Link href="/browse?genre=action">Action</Link></li>
              <li><Link href="/browse?genre=fantasy">Fantasy</Link></li>
              <li><Link href="/browse?genre=thriller">Thriller</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Dramafy. Semua hak dilindungi.
          </p>
          <p className="footer__copy">
            Dibuat untuk pecinta drama Asia
          </p>
        </div>
      </div>
    </footer>
  )
}
