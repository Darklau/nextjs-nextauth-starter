"use client";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";

const Login = ({ session }: { session: Session | null }) => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (session && session.user) {
    return (
      <div className="border flex flex-col items-center justify-center gap-2 p-4">
        <h3>Login component client rendered</h3>
        <p className="flex items-center gap-2">
          <Image
            src={
              session.user.image ||
              `https://avatars.dicebear.com/api/micah/${session.user.name}.svg`
            }
            width={40}
            height={40}
            alt={session.user.name || `Profile Icon`}
            className="rounded-full"
          />
          {session.user.email}
        </p>
        <button
          className="rounded-md border border-slate-300 px-3 py-1"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-slate-100 p-8 flex flex-col items-center justify-center w-min gap-6 border">
      <h3 className="text-lg font-semibold">Auth component</h3>

      {/* Tabs */}
      <div className="flex gap-4 border-b w-full justify-center">
        <button
          className={`px-3 py-1 ${
            tab === "login" ? "border-b-2 border-blue-500 font-medium" : ""
          }`}
          onClick={() => {
            setTab("login");
            setMessage(null);
          }}
        >
          Login
        </button>
        <button
          className={`px-3 py-1 ${
            tab === "register" ? "border-b-2 border-blue-500 font-medium" : ""
          }`}
          onClick={() => {
            setTab("register");
            setMessage(null);
          }}
        >
          Register
        </button>
      </div>

      {tab === "login" && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setMessage(null);
            const res = await signIn("credentials", {
              email,
              password,
              redirect: false,
            });
            setLoading(false);
            if (res?.error) {
              setMessage("❌ " + res.error);
            } else {
              setMessage("✅ Logged in!");
            }
          }}
          className="flex flex-col gap-2 w-full"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-1"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md border border-slate-300 px-3 py-1 bg-slate-100"
          >
            {loading ? "Загрузка..." : "Login"}
          </button>
        </form>
      )}

      {tab === "register" && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setMessage(null);
            const res = await fetch("/api/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password, name }),
            });
            const data = await res.json();
            setLoading(false);
            if (!res.ok) {
              setMessage("❌ " + data.error);
            } else {
              setMessage("✅ Регистрация успешна! Теперь войдите.");
              setTab("login");
            }
          }}
          className="flex flex-col gap-2 w-full"
        >
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-1"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-1"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md border border-slate-300 px-3 py-1 bg-slate-100"
          >
            {loading ? "Загрузка..." : "Register"}
          </button>
        </form>
      )}

      {message && <p className="text-sm">{message}</p>}

      {/* OAuth кнопки */}
      <div className="flex gap-2">
        <button
          className="whitespace-nowrap rounded-md border border-slate-300 px-3 py-1"
          onClick={() => signIn("google")}
        >
          Google
        </button>
        <button
          className="whitespace-nowrap rounded-md border border-slate-300 px-3 py-1"
          onClick={() => signIn("github")}
        >
          Github
        </button>
      </div>
    </div>
  );
};

export default Login;
