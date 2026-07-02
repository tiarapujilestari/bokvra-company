import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import BadgeDivider from "@/components/BadgeDivider";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import AddProductForm from "@/components/AddProductForm";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { testimonials } from "@/data/testimonials";
import type { Product } from "@/types";

const categories: Array<Product["category"] | "Semua"> = [
  "Semua",
  "Coffee",
  "Non-Coffee",
  "Resto",
];

const serviceHighlights = [
  {
    title: "Ruang Kerja Nyaman",
    text: "Wifi cepat, colokan di tiap meja, dan tempat duduk yang didesain betah dipakai berjam-jam.",
  },
  {
    title: "Pesan di Tempat & Bawa Pulang",
    text: "Pesan langsung di kasir atau lewat aplikasi pesan antar favoritmu.",
  },
  {
    title: "Sewa Ruang Kecil",
    text: "Lantai dua kami bisa disewa untuk pertemuan kecil atau kumpul komunitas, hubungi kami untuk jadwal.",
  },
];

export default function Services() {
  const { user } = useAuth();
  const {
    products,
    allProducts,
    hiddenIds,
    addProduct,
    removeProduct,
    setHidden,
    isCustomProduct,
  } = useProducts();
  const isAdmin = user?.role === "admin";

  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("Semua");
  const [showAddForm, setShowAddForm] = useState(false);

  // Admins manage the full catalog (including hidden items); everyone else
  // only ever sees what's currently visible.
  const sourceList = isAdmin ? allProducts : products;

  const filtered = useMemo(() => {
    if (activeCategory === "Semua") return sourceList;
    return sourceList.filter((p) => p.category === activeCategory);
  }, [activeCategory, sourceList]);

  function handleAddProduct(product: Omit<Product, "id">) {
    addProduct(product);
    setShowAddForm(false);
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-espresso text-cream">
        <div className="absolute inset-0 bg-grain opacity-30" />
        <div className="container-wide relative py-24 md:py-28">
          <AnimatedSection>
            <p className="eyebrow !text-caramel mb-6">Menu &amp; Layanan</p>
            <h1 className="max-w-2xl font-display text-4xl md:text-6xl font-medium leading-tight">
              Semua yang kami sajikan, dari kopi sampai ruang untuk singgah.
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="container-wide py-20 md:py-24">
        <AnimatedSection className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-espresso text-cream shadow-md"
                    : "bg-white/60 text-espresso/60 border border-espresso/10 hover:text-espresso"
                }`}
              >
                {cat === "Semua" ? "Semua Menu" : cat}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              onClick={() => setShowAddForm((v) => !v)}
              className="btn-primary !py-2.5 !px-5 text-xs"
            >
              {showAddForm ? "Tutup Form" : "+ Tambah Menu"}
            </button>
          )}
        </AnimatedSection>

        {isAdmin && (
          <p className="mb-8 text-xs text-ink/40">
            Mode admin: kamu melihat semua menu termasuk yang disembunyikan
            {hiddenIds.length > 0 ? ` (${hiddenIds.length} disembunyikan)` : ""}
            . Pengunjung biasa hanya melihat menu yang aktif.
          </p>
        )}

        {isAdmin && (
          <AnimatePresence>
            {showAddForm && (
              <AddProductForm
                onSubmit={handleAddProduct}
                onCancel={() => setShowAddForm(false)}
              />
            )}
          </AnimatePresence>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-espresso/10 bg-white/60 p-12 text-center">
            <p className="font-display text-xl text-espresso mb-2">
              Belum ada menu di kategori ini
            </p>
            <p className="text-sm text-ink/60">Coba pilih kategori lain.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                adminControls={
                  isAdmin
                    ? {
                        isHidden: hiddenIds.includes(product.id),
                        canDelete: isCustomProduct(product.id),
                        onToggleHidden: () =>
                          setHidden(
                            product.id,
                            !hiddenIds.includes(product.id),
                          ),
                        onDelete: () => removeProduct(product.id),
                      }
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </section>

      <section className="bg-cream-deep py-24">
        <div className="container-wide">
          <AnimatedSection className="max-w-xl mb-14">
            <BadgeDivider label="Lebih dari Sekadar Kopi" />
            <h2 className="mt-6 font-display text-3xl font-medium text-espresso">
              Layanan yang membuat kunjunganmu lebih mudah.
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-3">
            {serviceHighlights.map((s, i) => (
              <AnimatedSection
                key={s.title}
                delay={i * 0.1}
                className="rounded-3xl bg-white/70 border border-espresso/10 p-7"
              >
                <span className="badge-ring h-10 w-10 border-caramel-dark/50 mb-5">
                  <span className="font-display text-sm text-caramel-dark">
                    {i + 1}
                  </span>
                </span>
                <h3 className="font-display text-lg text-espresso mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed">{s.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-24 md:py-28">
        <AnimatedSection className="max-w-xl mb-14">
          <BadgeDivider label="Kata Pelanggan" />
          <h2 className="mt-6 font-display text-3xl font-medium text-espresso">
            Dipercaya untuk kerja, kumpul, dan cerita panjang.
          </h2>
        </AnimatedSection>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.08}>
              <TestimonialCard testimonial={t} />
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}
