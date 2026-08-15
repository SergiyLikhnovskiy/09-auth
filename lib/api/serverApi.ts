import { cookies } from "next/headers";
import { nextApi } from "./api";
import { User } from "@/types/user";
import { FetchNotesParams, FetchNotesResponse } from "./clientApi";
import { Note } from "@/types/note";

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const response = await nextApi.get<FetchNotesResponse>("/notes", {
    params,
    headers: { Cookie: cookieStore.toString() },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextApi.delete<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextApi.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const response = await nextApi.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
}
