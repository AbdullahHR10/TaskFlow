import type { Frequency } from "./enums";
import type { Priority, Category, BackgroundColor } from "@/types/enums";

export interface CreateHabitDTO {
  title: string;
  description?: string;
  frequency: Frequency;
  target_count: number;
  priority: Priority;
  category: Category;
  background_color?: BackgroundColor;
}

export interface UpdateHabitDTO {
  title?: string;
  description?: string;
  frequency?: Frequency;
  target_count?: number;
  priority?: Priority;
  category?: Category;
  is_active?: boolean;
  background_color?: BackgroundColor | null;
}
