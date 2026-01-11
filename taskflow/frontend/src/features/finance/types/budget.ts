import type { BaseEntity } from "@/types/base";
import type { Frequency } from "@/features/shared/types/enums";
import type { BudgetCategory } from "@/features/finance/types/enums";

export interface Budget extends BaseEntity {
  category: BudgetCategory;
  amount: number;
  spent: number;
  period: Frequency;
  start_date: string;
  end_date: string;
}
