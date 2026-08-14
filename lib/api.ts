import { Note, NoteTag } from "@/types/note";
import axios from "axios";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}
interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}
export interface CreateNoteProps {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response = await noteApi.get<FetchNotesResponse>("/notes", { params });

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await noteApi.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(note: CreateNoteProps): Promise<Note> {
  const response = await noteApi.post<Note>("/notes", note);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await noteApi.get<Note>(`/notes/${id}`);
  return response.data;
}
