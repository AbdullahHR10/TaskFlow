import type { BaseEntity } from "@/types/base";
import type { TransactionType, BudgetCategory } from "./enums";

export interface Transaction extends BaseEntity {
  title: string;
  description: string | null;
  amount: number;
  type: TransactionType;
  date: string;
  category: BudgetCategory;
}
