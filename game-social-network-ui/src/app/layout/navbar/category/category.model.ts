import { IconName } from "@fortawesome/free-regular-svg-icons"

export type CategoryName = "ALL" | "GAME" | "BLOG" | "CALENDAR" | "PROFIL"

export interface Category{
  icon: IconName,
  displayName: string,
  technicalName: CategoryName,
  activated: boolean
}
