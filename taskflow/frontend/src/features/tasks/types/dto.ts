import type { Priority, Category } from "@/features/shared/types/enums";

export interface CreateTaskDTO {
  title: string;
  description: string;
  priority: Priority;
  deadline: string;
  category: Category;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  priority?: Priority;
  deadline?: string;
  category?: Category;
  completed?: boolean;
}
