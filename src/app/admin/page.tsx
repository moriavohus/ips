"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-[440px]">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6">
            <span className="text-white font-bold text-xl tracking-tight">IPS</span>
          </div>
          <h1 className="font-display text-h3 font-normal tracking-tight text-black mb-2">
            Admin Panel
          </h1>
          <p className="text-base text-type-secondary">
            Sign in to manage products and documents
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-[14px] p-8 md:p-10 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-[0.1em] mb-3">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3.5 bg-background rounded-[12px] text-base text-black outline-none border-2 border-transparent focus:border-black transition-colors"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-[0.1em] mb-3">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-background rounded-[12px] text-base text-black outline-none border-2 border-transparent focus:border-black transition-colors"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-type-brand text-sm font-medium px-4 py-3 rounded-[12px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-black text-white text-base font-bold uppercase tracking-wider rounded-[12px] transition-all hover:bg-surface-darker disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-type-third mt-6">
          IPS Middle East &mdash; Admin Panel
        </p>
      </div>
    </div>
  );
}
