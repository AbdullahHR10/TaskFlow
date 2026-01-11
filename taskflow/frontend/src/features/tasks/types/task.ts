import type { BaseEntity } from "@/types/base";
import type { Priority, Category } from "@/types/enums";

export interface Task extends BaseEntity {
  title: string;
  description: string;
  priority: Priority;
  deadline: string;
  completed: boolean;
  category: Category;
  completedAt: string | null;
}
