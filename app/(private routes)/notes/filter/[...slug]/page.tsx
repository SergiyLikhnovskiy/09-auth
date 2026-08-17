import { fetchNotes } from "@/lib/api/serverApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string[] }>;
}
export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug[0];
  return {
    title: `Filtered notes:${tag}`,
    description: `noteHub filtered by:${tag}`,
    openGraph: {
      title: `Filtered notes:${tag}`,
      description: `noteHub filtered by:${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0] === "all" ? undefined : (slug[0] as NoteTag);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {<NotesClient tag={tag} />}
    </HydrationBoundary>
  );
}
