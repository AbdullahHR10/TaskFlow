export const Priority = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
} as const;

export type Priority =
  typeof Priority[keyof typeof Priority];

export const Category = {
  WORK: "Work",
  PERSONAL: "Personal",
  STUDY: "Study",
  HEALTH: "Health",
  HOBBY: "Hobby",
  OTHER: "Other",
} as const;

export type Category =
  typeof Category[keyof typeof Category];

export const Frequency = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
} as const;

export type Frequency =
  typeof Frequency[keyof typeof Frequency];

export const BackgroundColor = {
  BLUE: "Blue",
  RED: "Red",
  GREEN: "Green",
  CYAN: "Cyan",
  YELLOW: "Yellow",
  ORANGE: "Orange",
  PURPLE: "Purple",
} as const;

export type BackgroundColor =
  typeof BackgroundColor[keyof typeof BackgroundColor];
