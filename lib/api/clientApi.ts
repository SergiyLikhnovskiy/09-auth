import { Note, NoteTag } from "@/types/note";
import axios from "axios";
import { nextApi } from "./api";
import { User } from "@/types/user";

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
export interface FetchNotesResponse {
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

export interface UserData {
  email: string;
  password: string;
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

export async function register(userData: UserData): Promise<User> {
  const response = await nextApi.post<User>("/auth/register", userData);
  return response.data;
}

export async function login(userData: UserData): Promise<User> {
  const response = await nextApi.post<User>("/auth/login", userData);
  return response.data;
}

export async function checkSession(): Promise<boolean> {
  const response = await nextApi.get<{ success: boolean }>("/auth/session");
  return response.data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await nextApi.get<User>("/users/me");
  return data;
}

export async function logout(): Promise<void> {
  await nextApi.post("/auth/logout");
}
