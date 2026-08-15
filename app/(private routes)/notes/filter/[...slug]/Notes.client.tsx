"use client";
import css from "./Notes.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import Error from "./error";
import { useState } from "react";
import { NoteTag } from "@/types/note";
import Link from "next/link";

interface NotesClientProps {
  tag?: NoteTag;
}

function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["notes", tag, query, page],
    queryFn: () => fetchNotes({ page, search: query, perPage: 12, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];
  const totalPage = data?.totalPages ?? 0;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const searchDebounced = useDebouncedCallback((newValue: string) => {
    setQuery(newValue);
    setPage(1);
  }, 500);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox onChange={searchDebounced} />}

          {totalPage > 1 && (
            <Pagination
              page={page}
              totalPage={totalPage}
              onChange={handleChangePage}
            />
          )}
          {
            <Link href="/notes/action/create" className={css.button}>
              Create note +
            </Link>
          }
        </header>

        {isLoading && <Loader />}
        {isError && <Error error={error} />}
        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
}

export default NotesClient;
