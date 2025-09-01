import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create note - NoteHub",
  description: "Create a new note and save it as a draft before submitting.",
  openGraph: {
    title: "Create note - NoteHub",
    description: "Page for creating a new note with draft saving support.",
    url: "https://notehub.com/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note",
      },
    ],
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}



// import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

// import CreateNoteClient from "./CreateNote.client";
// import { createNote } from "@/lib/api";

// type CreateNotePageProps = {
//   params: Promise<{ newNote: Pick<Note, "title" | "content" | "tag"> }>;
// };


// export default async function CreateNotePage({
//   params }: CreateNotePageProps) {

// const {  } = await params;
// const queryClient = new QueryClient();

// await queryClient.prefetchQuery({
//   queryKey: ["notes", newNote],
//   queryFn: () => createNote( newNote),
// });

// return (
//   <HydrationBoundary state={dehydrate(queryClient)}>
//     <CreateNoteClient />
//   </HydrationBoundary>
//   );
// }