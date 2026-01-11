import type { BaseEntity } from "@/types/base";
import type { BackgroundColor } from "@/features/shared/types/enums";

export interface Note extends BaseEntity {
  title: string;
  content: string;
  background_color: BackgroundColor;
}
