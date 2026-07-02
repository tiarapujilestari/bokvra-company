import { Link } from 'react-router-dom'
import AnimatedSection from '@/components/AnimatedSection'
import BadgeDivider from '@/components/BadgeDivider'
import storefront from '@/assets/images/storefront.jpg'
import latte from '@/assets/images/drink-latte.jpg'

const milestones = [
  { year: '2022', text: 'Bokvra dimulai sebagai kedai kecil dengan tiga meja dan satu mesin espresso.' },
  { year: '2023', text: 'Menu non-coffee diperkenalkan setelah banyak tamu datang bersama keluarga.' },
  { year: '2024', text: 'Pindah ke bangunan dua lantai sekarang, lengkap dengan balkon dan area resto.' },
  { year: '2026', text: 'Melayani ratusan tamu tiap minggu, masih dengan resep dan filosofi yang sama.' },
]

const values = [
  {
    title: 'Sabar dalam proses',
    text: 'Dari seduhan cold brew 18 jam hingga cara kami melatih staf baru, kami memilih cara yang tidak instan.',
  },
  {
    title: 'Ramah untuk semua',
    text: 'Bokvra dirancang untuk siapa saja — yang datang sendiri untuk kerja, atau ramai-ramai bersama keluarga.',
  },
  {
    title: 'Detail yang jujur',
    text: 'Kami tidak menutupi bahan dengan gula berlebih. Rasa asli bahan baku adalah yang kami jaga.',
  },
]

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div className="absolute inset-0 bg-grain opacity-30" />
        <div className="container-wide relative py-24 md:py-28">
          <AnimatedSection>
            <p className="eyebrow !text-caramel mb-6">Tentang Kami</p>
            <h1 className="max-w-2xl font-display text-4xl md:text-6xl font-medium leading-tight">
              Cerita di balik cangkir yang kamu pegang sekarang.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-wide py-24 md:py-28 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <AnimatedSection className="relative">
          <div className="overflow-hidden rounded-[2rem]">
            <img src={storefront} alt="Tampak depan Bokvra Coffee & Resto" className="h-[420px] w-full object-cover" />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <BadgeDivider label="Bagaimana Semua Dimulai" />
          <h2 className="mt-6 font-display text-3xl font-medium text-espresso leading-snug">
            Dari dapur rumah ke kedai dua lantai di Pekanbaru.
          </h2>
          <p className="mt-5 text-ink/70 leading-relaxed">
            Bokvra dimulai dari resep kopi susu gula aren buatan rumah yang awalnya hanya
            dinikmati keluarga dan teman dekat. Setelah beberapa kali diminta untuk "dijual saja",
            kedai kecil pertama kami buka di 2022 dengan tiga meja dan satu mesin espresso bekas.
          </p>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Nama <span className="font-semibold text-espresso">Bokvra</span> sendiri terinspirasi
            dari biji kopi (bean) dan cerita panjang (chronicle) yang ingin kami rangkai lewat
            setiap cangkir yang kami sajikan.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-cream-deep py-24 md:py-28">
        <div className="container-wide">
          <AnimatedSection className="max-w-xl mb-14">
            <BadgeDivider label="Perjalanan Kami" />
            <h2 className="mt-6 font-display text-3xl font-medium text-espresso">
              Empat tahun, satu filosofi yang sama.
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-4">
            {milestones.map((m, i) => (
              <AnimatedSection key={m.year} delay={i * 0.1} className="rounded-3xl bg-white/70 border border-espresso/10 p-6">
                <p className="font-display text-3xl text-caramel-dark mb-3">{m.year}</p>
                <p className="text-sm text-ink/70 leading-relaxed">{m.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-24 md:py-28 grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <AnimatedSection>
          <BadgeDivider label="Budaya Kerja" />
          <h2 className="mt-6 font-display text-3xl font-medium text-espresso leading-snug">
            Ruang yang hangat dimulai dari tim yang nyaman bekerja.
          </h2>
          <div className="mt-8 space-y-6">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4">
                <span className="badge-ring mt-1 h-8 w-8 shrink-0 border-caramel-dark/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-caramel-dark" />
                </span>
                <div>
                  <h3 className="font-display text-lg text-espresso">{v.title}</h3>
                  <p className="mt-1 text-sm text-ink/70 leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/teams" className="btn-ghost mt-8 inline-block">
            Kenalan dengan tim kami →
          </Link>
        </AnimatedSection>
        <AnimatedSection delay={0.1} className="overflow-hidden rounded-[2rem]">
          <img src={latte} alt="Kopi susu gula aren Bokvra" className="h-[440px] w-full object-cover" />
        </AnimatedSection>
      </section>
    </div>
  )
}
