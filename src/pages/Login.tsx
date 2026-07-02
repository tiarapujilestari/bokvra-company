import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/blog";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result =
      mode === "login"
        ? await login(email, password)
        : await register(name, email, password);

    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "Terjadi kesalahan, silakan coba lagi.");
      return;
    }

    navigate(from, { replace: true });
  }

  return (
    <div className="container-wide flex min-h-[70vh] items-center justify-center py-20">
      <AnimatedSection className="w-full max-w-md rounded-3xl bg-white/70 border border-espresso/10 p-8 md:p-10 shadow-sm">
        <p className="eyebrow mb-3">
          {mode === "login" ? "Masuk" : "Daftar Akun"}
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-medium text-espresso mb-2">
          {mode === "login" ? "Selamat datang kembali" : "Buat akun baru"}
        </h1>
        <p className="text-sm text-ink/60 mb-8">
          {mode === "login"
            ? "Masuk untuk menulis dan mengelola blog kamu."
            : "Daftar untuk mulai menulis cerita dan resep di Bokvra."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {mode === "register" && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-espresso"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="field"
                placeholder="Nama kamu"
                required
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-espresso"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
              placeholder="kamu@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-espresso"
            >
              Kata Sandi
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
              placeholder="••••••••"
              required
              minLength={4}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {isSubmitting
              ? "Memproses..."
              : mode === "login"
                ? "Masuk"
                : "Daftar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink/60">
          {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setError(null);
            }}
            className="font-semibold text-caramel-dark hover:underline"
          >
            {mode === "login" ? "Daftar di sini" : "Masuk di sini"}
          </button>
        </p>

        {mode === "login" && (
          <p className="mt-4 rounded-xl bg-cream-deep px-4 py-3 text-xs text-ink/50"></p>
        )}

        <Link
          to="/"
          className="mt-6 block text-center text-xs text-ink/40 hover:text-ink/60"
        >
          ← Kembali ke Beranda
        </Link>
      </AnimatedSection>
    </div>
  );
}
