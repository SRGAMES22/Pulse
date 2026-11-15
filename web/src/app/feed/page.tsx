"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import api from "@/lib/api";

export default function FeedPage() {
  const { user, loading, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) loadFeed();
  }, [user]);

  const loadFeed = async () => {
    try {
      const res = await api.get("/feed");
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setPosting(true);
    try {
      await api.post("/posts", { content });
      setContent("");
      loadFeed();
    } catch (err) {
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  const toggleLike = async (post: any) => {
    try {
      if (post.liked_by_me) {
        await api.delete(`/posts/${post.id}/unlike`);
      } else {
        await api.post(`/posts/${post.id}/like`);
      }
      loadFeed();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <p style={{ color: "var(--muted)" }}>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-10" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold" style={{ color: "var(--primary)" }}>Pulse</h1>
            {user.subscription_type === "chaos" && (
              <span className="text-xs px-2 py-1 rounded-full font-medium text-white" style={{ backgroundColor: "#e31c25" }}>
                CHAOS
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
              <button onClick={() => setTheme("light")} className="px-2 py-1 text-xs rounded" style={{ color: "var(--text)" }}>Light</button>
              <button onClick={() => setTheme("dark")} className="px-2 py-1 text-xs rounded" style={{ color: "var(--text)" }}>Dark</button>
              <button
                onClick={() => user.subscription_type === "chaos" && setTheme("chaos")}
                disabled={user.subscription_type !== "chaos"}
                className="px-2 py-1 text-xs rounded disabled:opacity-40"
                style={{ color: "var(--text)" }}
              >
                Chaos
              </button>
            </div>
            <button onClick={logout} className="text-sm" style={{ color: "var(--muted)" }}>Sair</button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Criar post */}
        <form onSubmit={handlePost} className="mb-8 p-4 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="O que está acontecendo?"
            rows={3}
            className="w-full resize-none focus:outline-none bg-transparent"
            style={{ color: "var(--text)" }}
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={posting || !content.trim()}
              className="px-5 py-2 rounded-full font-semibold text-white disabled:opacity-50"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {posting ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>

        {/* Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="p-5 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: "var(--primary)" }}>
                  {post.user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "var(--text)" }}>{post.user.name}</p>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>@{post.user.username}</p>
                </div>
              </div>

              <p className="mb-4 whitespace-pre-wrap" style={{ color: "var(--text)" }}>{post.content}</p>

              <div className="flex items-center gap-6 text-sm" style={{ color: "var(--muted)" }}>
                <button
                  onClick={() => toggleLike(post)}
                  className="flex items-center gap-1 hover:opacity-80"
                  style={{ color: post.liked_by_me ? "var(--primary)" : "var(--muted)" }}
                >
                  {post.liked_by_me ? "♥" : "♡"} {post.likes_count}
                </button>
                <span>💬 {post.comments_count}</span>
              </div>
            </article>
          ))}

          {posts.length === 0 && (
            <p className="text-center py-12" style={{ color: "var(--muted)" }}>Nenhum post ainda. Seja o primeiro!</p>
          )}
        </div>
      </main>
    </div>
  );
}
