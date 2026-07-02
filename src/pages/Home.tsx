import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SteamCursor from "@/components/SteamCursor";
import AnimatedSection from "@/components/AnimatedSection";
import BadgeDivider from "@/components/BadgeDivider";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import { useProducts } from "@/context/ProductContext";
import { testimonials } from "@/data/testimonials";
import storefront from "@/assets/images/storefront.jpg";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-espresso text-cream"
      >
        <SteamCursor containerRef={heroRef} />
        <div className="absolute inset-0 bg-grain opacity-40" />
        <div className="container-wide relative z-10 grid gap-14 py-24 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow !text-caramel mb-6"
            >
              Bokvra Coffee &amp; Resto — Pekanbaru
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-medium leading-[1.02] tracking-tight"
            >
              Ngopi
              <br />
              <span className="italic text-caramel-light">senyaman</span>
              <br />
              rumah.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 max-w-md text-base leading-relaxed text-cream/70"
            >
              Setiap cangkir diseduh perlahan, setiap sudut ruang dirancang
              untuk membuat kamu betah berlama-lama. Gerakkan kursor untuk
              merasakan aroma kami menyapa layar.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/services"
                className="btn-primary !bg-caramel !text-espresso hover:!bg-caramel-light"
              >
                Lihat Menu
              </Link>
              <Link
                to="/about"
                className="btn-secondary !border-cream/40 !text-cream hover:!bg-cream hover:!text-espresso"
              >
                Kenali Kami
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-[2.5rem] border border-cream/10" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-black/40">
              <img
                src={storefront}
                alt="Bangunan Bokvra Coffee & Resto di sore hari"
                className="h-[420px] w-full object-cover md:h-[520px]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-cream px-6 py-4 shadow-xl sm:block">
              <p className="font-display text-2xl text-espresso">07.00–21.00</p>
              <p className="text-xs uppercase tracking-wide text-espresso/50">
                Buka setiap hari
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="overflow-hidden border-y border-espresso/10 bg-cream-deep py-3">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              {[
                "Espresso Rumahan",
                "Cold Brew 18 Jam",
                "Matcha Ceremonial",
                "Ruang Kerja Nyaman",
                "Resto Harian",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-espresso/60"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-caramel-dark" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* OVERVIEW */}
      <section className="container-wide py-24 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <AnimatedSection>
            <BadgeDivider label="Tentang Bokvra" />
            <h2 className="mt-6 font-display text-3xl md:text-4xl font-medium text-espresso leading-tight">
              Kafe rumahan yang tumbuh dari resep keluarga dan kecintaan pada
              proses lambat.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-ink/70 leading-relaxed">
              Bokvra lahir dari keinginan sederhana: membuat tempat di mana
              orang bisa duduk selama yang mereka mau tanpa merasa terburu-buru.
              Dari racikan kopi susu gula aren khas hingga cold brew yang
              diseduh 18 jam, setiap menu kami dibuat dengan proses yang sama
              seperti menyiapkan minuman untuk tamu di rumah sendiri.
            </p>
            <Link to="/about" className="btn-ghost mt-6 inline-block">
              Baca kisah lengkap kami →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-cream-deep py-24 md:py-28">
        <div className="container-wide">
          <AnimatedSection className="max-w-xl">
            <BadgeDivider label="Menu Favorit" />
            <h2 className="mt-6 font-display text-3xl md:text-4xl font-medium text-espresso">
              Diseduh perlahan, dinikmati lebih lama.
            </h2>
          </AnimatedSection>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services" className="btn-primary">
              Lihat Semua Menu
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-wide py-24 md:py-28">
        <AnimatedSection className="max-w-xl">
          <BadgeDivider label="Kata Mereka" />
          <h2 className="mt-6 font-display text-3xl md:text-4xl font-medium text-espresso">
            Cerita dari yang sudah singgah.
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.08}>
              <TestimonialCard testimonial={t} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-wide pb-24 md:pb-28">
        <AnimatedSection className="relative overflow-hidden rounded-[2.5rem] bg-espresso px-8 py-16 text-center text-cream md:px-16 md:py-20">
          <div className="absolute inset-0 bg-grain opacity-30" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-medium">
              Singgah dulu, ngobrol dulu.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-cream/60">
              Kami tunggu kamu di Jl. Melati No. 12, Pekanbaru — setiap hari,
              dari pagi sampai malam.
            </p>
            <Link
              to="/services"
              className="btn-primary mt-8 inline-flex !bg-caramel !text-espresso hover:!bg-caramel-light"
            >
              Jelajahi Menu
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
