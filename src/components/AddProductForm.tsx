import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import fallbackImage from "@/assets/images/drink-cold-brew.jpg";

interface AddProductFormProps {
  onSubmit: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
}

const categoryOptions: Product["category"][] = [
  "Coffee",
  "Non-Coffee",
  "Resto",
];
const MAX_FILE_SIZE_MB = 5;

function fileToResizedDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Gagal membaca file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("File bukan gambar yang valid."));
      img.onload = () => {
        const maxWidth = 900;
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Browser tidak mendukung pemrosesan gambar."));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function AddProductForm({
  onSubmit,
  onCancel,
}: AddProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Product["category"]>("Coffee");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File yang dipilih harus berupa gambar.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Ukuran gambar maksimal ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setError(null);
    setIsProcessingImage(true);
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      setUploadedImage(dataUrl);
      setImageUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memproses gambar.");
    } finally {
      setIsProcessingImage(false);
    }
  }

  function handleRemoveUpload() {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const priceNumber = Number(price);
    if (
      !name.trim() ||
      !description.trim() ||
      !price.trim() ||
      Number.isNaN(priceNumber) ||
      priceNumber <= 0
    ) {
      setError(
        "Nama, deskripsi, dan harga (angka lebih dari 0) wajib diisi dengan benar.",
      );
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({
      name: name.trim(),
      category,
      description: description.trim(),
      price: priceNumber,
      image: uploadedImage || imageUrl.trim() || fallbackImage,
      tags: tags.length > 0 ? tags : ["Menu Baru"],
    });

    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setUploadedImage(null);
    setTagsInput("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl bg-white/80 border border-espresso/10 p-7 mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="eyebrow mb-1">Khusus Admin</p>
          <h3 className="font-display text-xl text-espresso">
            Tambah Menu Baru
          </h3>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-ink/50 hover:text-ink/80"
          aria-label="Tutup form"
        >
          Batal
        </button>
      </div>

      {error && (
        <p className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="p-name"
            className="mb-2 block text-sm font-semibold text-espresso"
          >
            Nama Menu
          </label>
          <input
            id="p-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field"
            placeholder="Contoh: Es Kopi Pandan"
          />
        </div>

        <div>
          <label
            htmlFor="p-category"
            className="mb-2 block text-sm font-semibold text-espresso"
          >
            Kategori
          </label>
          <select
            id="p-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Product["category"])}
            className="field"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="p-desc"
            className="mb-2 block text-sm font-semibold text-espresso"
          >
            Deskripsi
          </label>
          <textarea
            id="p-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="field resize-y"
            placeholder="Ceritakan rasa dan bahan menu ini"
          />
        </div>

        <div>
          <label
            htmlFor="p-price"
            className="mb-2 block text-sm font-semibold text-espresso"
          >
            Harga (Rp)
          </label>
          <input
            id="p-price"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="field"
            placeholder="25000"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-espresso">
            Foto Menu
          </label>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex-1">
              <p className="mb-2 text-xs text-ink/50">
                Opsi 1 — Upload foto dari komputer
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="field cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-espresso file:px-4 file:py-2 file:text-xs file:font-semibold file:text-cream hover:file:bg-espresso-800"
              />
              {isProcessingImage && (
                <p className="mt-2 text-xs text-ink/50">Memproses gambar...</p>
              )}

              <p className="mt-4 mb-2 text-xs text-ink/50">
                Opsi 2 — atau tempel URL gambar (harus http/https)
              </p>
              <input
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  if (e.target.value) handleRemoveUpload();
                }}
                className="field"
                placeholder="https://..."
                disabled={!!uploadedImage}
              />
              {!imageUrl && !uploadedImage && (
                <p className="mt-2 text-xs text-ink/40">
                  Kosongkan keduanya untuk pakai foto contoh bawaan.
                </p>
              )}
            </div>

            {uploadedImage && (
              <div className="relative shrink-0">
                <img
                  src={uploadedImage}
                  alt="Pratinjau foto menu"
                  className="h-28 w-28 rounded-2xl object-cover border border-espresso/10"
                />
                <button
                  type="button"
                  onClick={handleRemoveUpload}
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-espresso text-cream text-xs shadow"
                  aria-label="Hapus foto"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="p-tags"
            className="mb-2 block text-sm font-semibold text-espresso"
          >
            Tag{" "}
            <span className="font-normal text-ink/40">
              (pisahkan dengan koma)
            </span>
          </label>
          <input
            id="p-tags"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="field"
            placeholder="Best Seller, Musiman"
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn-primary mt-6"
        disabled={isProcessingImage}
      >
        Simpan Menu
      </button>
    </motion.form>
  );
}
