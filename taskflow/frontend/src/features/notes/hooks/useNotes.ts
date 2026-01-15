import { useEffect, useRef } from "react";
import { notesApi } from "../api/notes";
import type { Note } from "../types/note";
import type { CreateNoteDTO, UpdateNoteDTO } from "../types/dto";
import { usePagination } from "@/hooks/usePagination";

export const useNotes = () => {
  const didFetchRef = useRef(false);

  const pagination = usePagination<Note>((page) =>
    notesApi.getAll(page).then(res => ({
      items: res.data!.items,
      pages: res.data!.pages,
      currentPage: res.data!.current_page,
    }))
  );

  const {
    items: notes,
    fetchFirstPage,
    appendItem,
    updateItem,
    deleteItem,
  } = pagination;

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
  
    fetchFirstPage();
  }, [fetchFirstPage]);

  const createNote = async (payload: CreateNoteDTO) => {
    const newNote = await notesApi.create(payload);
    appendItem(newNote);
  };

  const updateNote = async (id: string, payload: UpdateNoteDTO) => {
    const updated = await notesApi.update(id, payload);
    updateItem(id, updated);
  };

  const deleteNote = async (id: string) => {
    await notesApi.delete(id);
    deleteItem(id);
  };

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
    ...pagination,
  };
}

