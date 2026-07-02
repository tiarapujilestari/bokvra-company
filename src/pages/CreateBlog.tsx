import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimatedSection from '@/components/AnimatedSection'
import { useAuth } from '@/context/AuthContext'
import { useBlog } from '@/context/BlogContext'

export default function CreateBlog() {
  const { user } = useAuth()
  const { addPost } = useBlog()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !content.trim()) {
      setError('Judul dan isi tulisan wajib diisi.')
      return
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const newPost = addPost({
      title: title.trim(),
      excerpt: excerpt.trim() || `${content.trim().slice(0, 120)}...`,
      content: content.trim(),
      author: user!.name,
      authorId: user!.id,
      tags: tags.length > 0 ? tags : ['Umum'],
    })

    navigate(`/blog/${newPost.id}`)
  }

  return (
    <div className="container-wide py-20 md:py-24 max-w-2xl">
      <AnimatedSection>
        <p className="eyebrow mb-4">Tulis Blog</p>
        <h1 className="font-display text-3xl md:text-4xl font-medium text-espresso mb-2">
          Bagikan cerita atau resep baru.
        </h1>
        <p className="text-sm text-ink/60 mb-10">
          Masuk sebagai <span className="font-semibold text-espresso">{user?.name}</span>. Tulisan
          kamu akan langsung tampil di halaman Blog.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold text-espresso">
              Judul
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field"
              placeholder="Contoh: Rahasia Susu Krim Kami"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="mb-2 block text-sm font-semibold text-espresso">
              Ringkasan singkat <span className="font-normal text-ink/40">(opsional)</span>
            </label>
            <input
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="field"
              placeholder="Satu-dua kalimat yang muncul di halaman Blog"
            />
          </div>

          <div>
            <label htmlFor="content" className="mb-2 block text-sm font-semibold text-espresso">
              Isi Tulisan
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="field resize-y"
              placeholder="Tulis ceritamu di sini. Pisahkan paragraf dengan baris kosong."
            />
          </div>

          <div>
            <label htmlFor="tags" className="mb-2 block text-sm font-semibold text-espresso">
              Tag <span className="font-normal text-ink/40">(pisahkan dengan koma)</span>
            </label>
            <input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="field"
              placeholder="Kopi, Resep, Di Balik Layar"
            />
          </div>

          <button type="submit" className="btn-primary">
            Publikasikan Tulisan
          </button>
        </form>
      </AnimatedSection>
    </div>
  )
}
