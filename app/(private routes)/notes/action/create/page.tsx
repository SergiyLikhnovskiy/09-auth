import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Create a new note",
  openGraph: {
    url: "https://08-zustand-s6ic-bnjkv4gr0-sergiylikhnovskiys-projects.vercel.app/notes/action/create",
    title: "Create Note",
    description: "Create a new note",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 600,
        alt: "NoteHub on openGraph",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {<NoteForm />}
      </div>
    </main>
  );
}
