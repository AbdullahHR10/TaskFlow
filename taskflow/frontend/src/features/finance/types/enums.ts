export const TransactionType = {
  INCOME: "Income",
  EXPENSE: "Expense",
} as const;

export type TransactionType =
  typeof TransactionType[keyof typeof TransactionType];

export const BudgetCategory = {
  SALARY: "Salary",
  FREELANCE: "Freelance",
  INVESTMENTS: "Investments",
  OTHER_INCOME: "Other Income",
  FOOD: "Food",
  TRANSPORT: "Transport",
  ENTERTAINMENT: "Entertainment",
  UTILITIES: "Utilities",
  SHOPPING: "Shopping",
  HEALTH: "Health",
  OTHER: "Other",
} as const;

export type BudgetCategory =
  typeof BudgetCategory[keyof typeof BudgetCategory];
