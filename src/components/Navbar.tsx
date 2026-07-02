import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'

const links = [
  { to: '/', label: 'Beranda' },
  { to: '/about', label: 'Tentang Kami' },
  { to: '/services', label: 'Menu & Layanan' },
  { to: '/teams', label: 'Tim' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLogout() {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <span className="badge-ring h-11 w-11 bg-espresso text-cream group-hover:rotate-12 transition-transform duration-300">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z" opacity="0.9" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-espresso">
              Bokvra
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-espresso/60">
              Coffee &amp; Resto
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors ${
                  isActive ? 'text-espresso' : 'text-espresso/60 hover:text-espresso'
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative pb-1">
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-caramel"
                    />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/blog/create" className="btn-secondary !py-2.5 !px-5 text-xs">
                Tulis Blog
              </Link>
              <button onClick={handleLogout} className="btn-ghost text-xs">
                Keluar
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary !py-2.5 !px-5 text-xs">
              Masuk
            </Link>
          )}
        </div>

        <button
          className="md:hidden p-2 text-espresso"
          onClick={() => setOpen((o) => !o)}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-cream border-t border-espresso/10"
          >
            <div className="container-wide flex flex-col gap-4 py-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-medium ${isActive ? 'text-caramel-dark' : 'text-espresso'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link to="/blog/create" onClick={() => setOpen(false)} className="btn-secondary justify-center">
                      Tulis Blog
                    </Link>
                    <button onClick={handleLogout} className="btn-primary justify-center">
                      Keluar
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-primary justify-center">
                    Masuk
                  </Link>
                )}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
