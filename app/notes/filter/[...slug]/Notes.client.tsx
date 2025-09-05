'use client';

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

import css from './NotesPage.module.css'

import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

interface NotesClientProps {
  tag?: string; 
}

export default function NotesClient({ tag }: NotesClientProps) {

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage: number = 12;

  
  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", {search: searchQuery, page: currentPage, tag}],
    queryFn: () => fetchNotes(searchQuery, currentPage, perPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        
        <SearchBox onChange={updateSearchQuery} />

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>

        <Toaster/>

      </header>

      {(data?.notes ?? []).length > 0 ? (
        <>
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          {data && <NoteList notes={data.notes} />}
        </>
      ) : (
        !isLoading && !isError && <p>No notes found</p>
      )}
    </div>
  );
}