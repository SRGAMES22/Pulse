"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("demo@pulse.app");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/feed");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--bg)" }}>
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "var(--primary)" }}>Pulse</h1>
          <p className="mt-2" style={{ color: "var(--muted)" }}>Sua rede social de nicho</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--muted)" }}>Email ou Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--muted)" }}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--muted)" }}>
          Use: <strong>demo@pulse.app</strong> / <strong>123456</strong>
        </p>
      </div>
    </div>
  );
}
