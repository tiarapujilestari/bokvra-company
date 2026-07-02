import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types";

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

interface ProductCardProps {
  product: Product;
  index?: number;
  /** Admin-only controls — all optional so existing usages are unaffected. */
  adminControls?: {
    isHidden: boolean;
    canDelete: boolean;
    onToggleHidden: () => void;
    onDelete: () => void;
  };
}

export default function ProductCard({
  product,
  index = 0,
  adminControls,
}: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 8 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      className={`group relative rounded-3xl bg-white/70 border border-espresso/10 p-5 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-espresso/10 [transform-style:preserve-3d] ${
        adminControls?.isHidden ? "opacity-50" : ""
      }`}
    >
      {adminControls?.isHidden && (
        <span className="absolute top-3 right-3 z-10 rounded-full bg-espresso/85 px-3 py-1 text-[10px] uppercase tracking-wide text-cream">
          Disembunyikan
        </span>
      )}

      <div className="relative overflow-hidden rounded-2xl mb-5 aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-espresso/85 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-wide text-cream"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-display text-lg font-medium text-espresso leading-snug">
          {product.name}
        </h3>
        <span className="shrink-0 font-display text-lg text-caramel-dark">
          {formatIDR(product.price)}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-ink/70">
        {product.description}
      </p>

      {adminControls && (
        <div className="mt-5 flex items-center gap-2 border-t border-espresso/10 pt-4">
          <button
            type="button"
            onClick={adminControls.onToggleHidden}
            className="flex-1 rounded-full border border-espresso/15 px-3 py-2 text-xs font-semibold text-espresso/70 transition-colors hover:border-espresso/40 hover:text-espresso"
          >
            {adminControls.isHidden ? "Tampilkan" : "Sembunyikan"}
          </button>

          {adminControls.canDelete &&
            (confirmingDelete ? (
              <div className="flex flex-1 items-center gap-1.5">
                <button
                  type="button"
                  onClick={adminControls.onDelete}
                  className="flex-1 rounded-full bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Yakin?
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingDelete(false)}
                  className="rounded-full border border-espresso/15 px-3 py-2 text-xs font-semibold text-espresso/60 hover:text-espresso"
                >
                  Batal
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="flex-1 rounded-full border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                Hapus
              </button>
            ))}
        </div>
      )}
    </motion.div>
  );
}
