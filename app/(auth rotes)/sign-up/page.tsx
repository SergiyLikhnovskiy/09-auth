"use client";
import { register } from "@/lib/api/clientApi";
import css from "./SignUpPage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const setUser = useAuthStore((store) => store.setUser);

  const [error, setError] = useState("");
  const handleSubmit = async (formData: FormData) => {
    const registerData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const userData = await register(registerData);
      setUser(userData);
      router.push("/profile");
    } catch (e) {
      setError("registretion is error");
    }
  };

  return (
    <>
      <main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form action={handleSubmit} className={css.form}>
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
              Register
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </main>
    </>
  );
}
