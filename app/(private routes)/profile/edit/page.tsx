"use client";
import { useRouter } from "next/navigation";
import css from "./EditProfilePage.module.css";
import { updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";

export default function EditProfilePage() {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string;
    try {
      const updateUser = await updateMe({ username });
      setUser(updateUser);

      router.push("/profile");
    } catch (error) {
      setError("Error update profile");
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>
          <form action={handleSubmit} className={css.profileInfo}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                name="username"
                id="username"
                type="text"
                className={css.input}
                defaultValue={user?.username ?? ""}
              />
            </div>
            <p>Email: {user?.email}</p>
            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button
                onClick={handleCancel}
                type="button"
                className={css.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
