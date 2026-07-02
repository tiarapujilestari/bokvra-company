import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-wide flex min-h-[70vh] flex-col items-center justify-center text-center py-20">
      <span className="badge-ring h-16 w-16 border-espresso/20 text-espresso mb-6">
        <span className="font-display text-2xl">?</span>
      </span>
      <h1 className="font-display text-3xl md:text-4xl font-medium text-espresso mb-3">
        Halaman ini belum diseduh.
      </h1>
      <p className="text-sm text-ink/60 mb-8 max-w-sm">
        Sepertinya kamu mengikuti tautan yang salah, atau halaman ini sudah dipindahkan.
      </p>
      <Link to="/" className="btn-primary">
        Kembali ke Beranda
      </Link>
    </div>
  )
}
