import { Link, useParams } from 'react-router-dom'
import AnimatedSection from '@/components/AnimatedSection'
import { useBlog } from '@/context/BlogContext'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const { getPost } = useBlog()
  const post = id ? getPost(id) : undefined

  if (!post) {
    return (
      <div className="container-wide py-28 text-center">
        <p className="font-display text-2xl text-espresso mb-3">Tulisan tidak ditemukan</p>
        <p className="text-sm text-ink/60 mb-8">Tulisan ini mungkin sudah dihapus atau belum pernah ada.</p>
        <Link to="/blog" className="btn-primary">
          Kembali ke Blog
        </Link>
      </div>
    )
  }

  return (
    <article>
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div className="absolute inset-0 bg-grain opacity-30" />
        <div className="container-wide relative py-24 md:py-28 max-w-3xl">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-cream/20 px-3 py-1 text-[10px] uppercase tracking-wide text-cream/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-medium leading-tight">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-3 text-sm text-cream/60">
              <span>{post.author}</span>
              <span>·</span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-wide py-16 md:py-20 max-w-3xl">
        <AnimatedSection className="prose-content space-y-5 text-ink/80 leading-relaxed">
          {post.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </AnimatedSection>

        <div className="mt-14 border-t border-espresso/10 pt-8">
          <Link to="/blog" className="btn-ghost">
            ← Kembali ke semua tulisan
          </Link>
        </div>
      </section>
    </article>
  )
}
