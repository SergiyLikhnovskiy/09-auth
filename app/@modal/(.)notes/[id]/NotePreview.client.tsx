"use client";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function NotesPreviewClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  const router = useRouter();
  const handleCloseModal = () => router.back();

  if (isLoading) {
    return <p>Please wait..</p>;
  }

  if (!note || isError) {
    return <p>Something wrong..</p>;
  }
  return (
    <Modal onClose={handleCloseModal}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
        <button className={css.button} onClick={handleCloseModal}>
          Back to notes
        </button>
      </div>
    </Modal>
  );
}
