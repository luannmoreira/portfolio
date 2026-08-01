export interface ExperienceEntry {
  /** Slug used as the `experience.entries.<id>.*` translation key prefix. */
  id: string;
  /** ISO dates (day fixed at 15, mid-month, purely to dodge timezone-driven
   * month-boundary flips when Intl.DateTimeFormat renders these near
   * midnight UTC) — formatted locale-aware via formatDate(). */
  startDate: string;
  endDate: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: "os-systems",
    startDate: "2023-03-15",
    endDate: "2026-07-15",
  },
  {
    id: "sedec",
    startDate: "2022-01-15",
    endDate: "2023-01-15",
  },
  {
    id: "videplast",
    startDate: "2020-10-15",
    endDate: "2022-01-15",
  },
];
