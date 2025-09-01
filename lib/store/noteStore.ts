import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewNote } from "../api";


const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteDraftStore = {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: "note-draft" }
  )
);
