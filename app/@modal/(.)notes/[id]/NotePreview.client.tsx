"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

import css from "./NotePreview.module.css";

export default function NotePreviewClient() {
  
  const { id } = useParams<{ id: string }>();
  
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back(); 
  };

  if (isLoading) {
    return <Modal onClose={handleClose}>Loading...</Modal>;
  }

  if (isError || !note) {
    return <Modal onClose={handleClose}>Something went wrong.</Modal>;
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {note.updatedAt
              ? `Updated at: ${new Date(note.updatedAt).toLocaleString()}`
              : `Created at: ${new Date(note.createdAt).toLocaleString()}`}
          </p>
        </div>
      </div>
    </Modal>
  );
}