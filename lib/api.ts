import { NewNote, Note } from "@/types/note";
import axios from "axios";


axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  },
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  search: string,
  page = 1,
  perPage = 12,
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    search,
    page,
    perPage,
  };

    if (tag) {
    params.tag = tag;
  }

  const response = await axios.get<FetchNotesResponse>("/notes", {
    ...config,
    params,
  });

  return response.data;
  
};

export const createNote = async (
  newNote: NewNote): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, config);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, config);
  return response.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${noteId}`, config);
  return response.data;
};
