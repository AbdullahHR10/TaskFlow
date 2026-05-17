import { apiFetch } from "@/api/client";
import type { PaginatedResponse } from "@/types/api";
import type { Note } from "../types/note";
import type { CreateNoteDTO, UpdateNoteDTO } from "../types/dto";

/**
 * Base path for notes-related endpoints.
 */
const NOTES_API_URL = "/api/v1/notes";

/**
 * Notes API wrapper.
 *
 * Handles:
 * - Pagination.
 * - Create, update and delete operations.
 */
export const notesApi = {
  /**
   * Fetches paginated notes.
   *
   * @param page Page number.
   * @param perPage Number of items per page.
   * @returns Paginated response containing notes.
   */
  getAll: async (
    page = 1,
    perPage = 12
  ): Promise<PaginatedResponse<Note>> => {
    const res = await apiFetch<{
      notes: Note[];
      total: number;
      pages: number;
      current_page: number;
      per_page: number;
    }>(`${NOTES_API_URL}`, {
      params: {
        page,
        per_page: perPage,
      },
    });

    const data = res.data!;

    return {
      status: res.status,
      data: {
        items: data.notes,
        total: data.total,
        pages: data.pages,
        current_page: data.current_page,
        per_page: data.per_page,
      },
    };
  },

  /**
   * Creates a new note.
   *
   * @param payload Note creation DTO.
   * @returns Created note.
   */
  create: async (payload: CreateNoteDTO): Promise<Note> => {
    const res = await apiFetch<Note>(`${NOTES_API_URL}/ `, {
      method: "POST",
      data: payload,
    });

    return res.data!;
  },

  /**
   * Updates an existing note.
   *
   * @param id Note ID.
   * @param payload Note update DTO.
   * @returns Updated note.
   */
  update: async (
    id: string,
    payload: UpdateNoteDTO,
  ): Promise<Note> => {
    const res = await apiFetch<Note>(`${NOTES_API_URL}/${id}`, {
      method: "PATCH",
      data: payload,
    });

    return res.data!;
  },

  /**
   * Deletes a note by ID.
   *
   * @param id Note ID.
   */
  delete: async (id: string): Promise<void> => {
    await apiFetch(`${NOTES_API_URL}/${id}`, {
      method: "DELETE",
    });
    },
};
