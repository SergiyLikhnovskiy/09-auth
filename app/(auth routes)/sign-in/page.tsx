"use client";

import { login } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const setUser = useAuthStore((store) => store.setUser);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const loginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const userData = await login(loginData);
      setUser(userData);
      router.push("/profile");
    } catch {
      setError("Login error");
    }
  };

  return (
    <>
      <main className={css.mainContent}>
        <form action={handleSubmit} className={css.form}>
          <h1 className={css.formTitle}>Sign in</h1>

          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Log in
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </>
  );
}
