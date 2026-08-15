"use client";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const user = useAuthStore((store) => store.user);
  const router = useRouter();
  const clearUser = useAuthStore((store) => store.clearIsAuthenticated);
  const handleLogout = async () => {
    await logout();
    clearUser();
    router.push("/sign-in");
  };
  return (
    <>
      {user ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>User email</p>
            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
