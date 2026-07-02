import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream/80 bg-grain">
      <div className="container-wide py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-ring h-10 w-10 border-cream/60 text-cream">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z" opacity="0.9" />
              </svg>
            </span>
            <span className="font-display text-lg text-cream">Bokvra Coffee &amp; Resto</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/60">
            Ngopi senyaman rumah. Ruang hangat untuk kerja, bertemu teman, atau sekadar duduk
            menikmati secangkir kopi yang diseduh dengan sabar.
          </p>
        </div>

        <div>
          <h4 className="eyebrow !text-cream/50 mb-4">Jelajahi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-cream transition-colors">Tentang Kami</Link></li>
            <li><Link to="/services" className="hover:text-cream transition-colors">Menu &amp; Layanan</Link></li>
            <li><Link to="/teams" className="hover:text-cream transition-colors">Tim</Link></li>
            <li><Link to="/blog" className="hover:text-cream transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-cream/50 mb-4">Kunjungi</h4>
          <ul className="space-y-2 text-sm text-cream/60">
            <li>Jl. Melati No. 12, Pekanbaru</li>
            <li>Buka setiap hari</li>
            <li>07.00 – 21.00</li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow !text-cream/50 mb-4">Ikuti Kami</h4>
          <ul className="space-y-2 text-sm text-cream/60">
            <li>@bokvra.coffee</li>
            <li>hello@bokvra.coffee</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream/40">
          <span>© {new Date().getFullYear()} Bokvra Coffee &amp; Resto. Seluruh hak cipta dilindungi.</span>
          <span>Dibuat dengan React, Vite &amp; TypeScript.</span>
        </div>
      </div>
    </footer>
  )
}
