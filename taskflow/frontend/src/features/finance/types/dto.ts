import type { Frequency } from "@/features/shared/types/enums";
import type { TransactionType, BudgetCategory } from "./enums";

export interface CreateTransactionDTO {
  title: string;
  description?: string;
  amount: number;
  type: TransactionType;
  date: string;
  category: BudgetCategory;
}

export interface CreateBudgetDTO {
  category: BudgetCategory;
  amount: number;
  period: Frequency;
  start_date: string;
  end_date: string;
}
