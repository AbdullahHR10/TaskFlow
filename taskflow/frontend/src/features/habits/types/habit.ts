import type { BaseEntity } from "@/types/base";
import type { Frequency } from "@/features/shared/types/enums";
import type { Priority, Category, BackgroundColor } from "@/features/shared/types/enums";

export interface Habit extends BaseEntity {
  title: string;
  description: string | null;
  frequency: Frequency;
  target_count: number;
  current_streak: number;
  longest_streak: number;
  last_completed: string | null;
  priority: Priority;
  category: Category;
  is_active: boolean;
  background_color: BackgroundColor | null;
}
