import type { BackgroundColor } from "@/features/shared/types/enums";

export interface CreateNoteDTO {
  title: string;
  content: string;
  background_color: BackgroundColor;
}

export interface UpdateNoteDTO {
  title?: string;
  content?: string;
  background_color?: BackgroundColor;
}
