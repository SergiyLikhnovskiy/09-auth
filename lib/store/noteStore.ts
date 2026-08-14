import { Note, NoteTag } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CreateNoteProps } from "../api";

type NoteDraftStore = {
  draft: CreateNoteProps;
  setDraft: (note: CreateNoteProps) => void;
  clearDraft: () => void;
};
const initialDraft: CreateNoteProps = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
