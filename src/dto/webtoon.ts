export type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export interface Webtoon {
  id: number;
  title: string;
  thumbnailUrl: string;
  platform: string;
  dayOfWeek: DayOfWeek;
  link: string;
}
