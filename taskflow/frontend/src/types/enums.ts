export const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;

export type Priority = typeof Priority[keyof typeof Priority];

export const Category = {
  WORK: "WORK",
  PERSONAL: "PERSONAL",
  HEALTH: "HEALTH",
} as const;

export type Category = typeof Category[keyof typeof Category];

export const Frequency = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
} as const;

export type Frequency = typeof Frequency[keyof typeof Frequency];

export const BackgroundColor = {
  RED: "RED",
  BLUE: "BLUE",
  GREEN: "GREEN",
} as const;

export type BackgroundColor =
  typeof BackgroundColor[keyof typeof BackgroundColor];

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
