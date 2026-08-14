import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: NoteDetailsPageProps): Promise<Metadata> => {
  const { id } = await params;
  const res = await fetchNoteById(id);

  return {
    title: `title id note ${res.title}`,
    description: `description ${res.content}`,
    openGraph: {
      url: `https://08-zustand-s6ic.vercel.app/notes/${id}`,
      title: `title ${res.title}`,
      description: `description ${res.content}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Note details in NoteHub",
        },
      ],
    },
  };
};

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
