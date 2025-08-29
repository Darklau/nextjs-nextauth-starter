"use client";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import { useState } from "react";

const Login = ({ session }: { session: Session | null }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (session && session.user) {
    // User signed in
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
    <div className="rounded-xl border-slate-100 p-8 flex items-center justify-center w-min gap-4 border flex-col">
      <h3>Login component client rendered</h3>

      {/* Логин/пароль */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await signIn("credentials", {
            email,
            password,
            redirect: false, // если не хочешь редиректить, можно true
          });
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
          className="rounded-md border border-slate-300 px-3 py-1 bg-slate-100"
        >
          Sign in with Email
        </button>
      </form>

      <div className="flex gap-2">
        <button
          className="whitespace-nowrap rounded-md border border-slate-300 px-3 py-1"
          onClick={() => signIn("google")}
        >
          Google Sign in
        </button>
        <button
          className="whitespace-nowrap rounded-md border border-slate-300 px-3 py-1"
          onClick={() => signIn("github")}
        >
          Github Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
