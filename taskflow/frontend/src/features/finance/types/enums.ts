export const TransactionType = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
} as const;

export type TransactionType =
  typeof TransactionType[keyof typeof TransactionType];

export const BudgetCategory = {
  FOOD: "FOOD",
  RENT: "RENT",
  TRANSPORT: "TRANSPORT",
} as const;

export type BudgetCategory =
  typeof BudgetCategory[keyof typeof BudgetCategory];
