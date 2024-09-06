import { IconName } from "@fortawesome/free-regular-svg-icons"

export type CategoryName = "ALL" | "GAME" | "BLOG" | "CALENDAR" | "PROFIL" | "MY POST"

export interface Category{
  icon: IconName,
  displayName: string,
  technicalName?: string,
  path: string,
  activated: boolean,
  generateUrl?: (userId: number) => string;
}
