import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '@/components/AnimatedSection'
import { useAuth } from '@/context/AuthContext'
import { useBlog } from '@/context/BlogContext'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogList() {
  const { posts } = useBlog()
  const { user } = useAuth()
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const tags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)))
    return Array.from(set)
  }, [posts])

  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts

  return (
    <div>
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div className="absolute inset-0 bg-grain opacity-30" />
        <div className="container-wide relative py-24 md:py-28 flex flex-wrap items-end justify-between gap-8">
          <AnimatedSection>
            <p className="eyebrow !text-caramel mb-6">Blog</p>
            <h1 className="max-w-2xl font-display text-4xl md:text-6xl font-medium leading-tight">
              Cerita, resep, dan hal-hal kecil dari balik meja bar kami.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <Link
              to="/blog/create"
              className="btn-primary !bg-caramel !text-espresso hover:!bg-caramel-light"
            >
              {user ? 'Tulis Postingan Baru' : 'Masuk untuk Menulis'}
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-wide py-20 md:py-24">
        {tags.length > 0 && (
          <AnimatedSection className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setActiveTag(null)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeTag === null
                  ? 'bg-espresso text-cream shadow-md'
                  : 'bg-white/60 text-espresso/60 border border-espresso/10 hover:text-espresso'
              }`}
            >
              Semua Topik
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeTag === tag
                    ? 'bg-espresso text-cream shadow-md'
                    : 'bg-white/60 text-espresso/60 border border-espresso/10 hover:text-espresso'
                }`}
              >
                {tag}
              </button>
            ))}
          </AnimatedSection>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-espresso/10 bg-white/60 p-12 text-center">
            <p className="font-display text-xl text-espresso mb-2">Belum ada tulisan di topik ini</p>
            <p className="text-sm text-ink/60">Coba pilih topik lain, atau jadi yang pertama menulis.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <AnimatedSection
                key={post.id}
                delay={i * 0.06}
                className="group flex h-full flex-col rounded-3xl bg-white/70 border border-espresso/10 p-7 transition-shadow duration-300 hover:shadow-xl hover:shadow-espresso/10"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cream-deep px-3 py-1 text-[10px] uppercase tracking-wide text-espresso/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-xl text-espresso leading-snug mb-3 group-hover:text-caramel-dark transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-ink/70 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-ink/50">
                  <span>{post.author}</span>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="btn-ghost mt-4 inline-block">
                  Baca selengkapnya →
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
