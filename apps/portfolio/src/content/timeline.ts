export type TimelineStatus = "completed" | "in-progress" | "planned";

export interface TimelineLink {
  /** Proper noun (site/product name) — never translated. */
  label: string;
  href: string;
}

export interface TimelineMilestoneSource {
  /** Slug used for the #hash deep link, the DOM id, and the
   * `timeline.milestones.<id>.*` translation key prefix. */
  id: string;
  /** A real 4-digit year, or a UI sentinel ("Today"/"Future") resolved via
   * `timeline.year.<sentinel>` — Timeline.tsx tells the two apart. */
  year: string;
  status: TimelineStatus;
  /** Proper nouns (tech/product names) — never translated. */
  technologies?: string[];
  links?: TimelineLink[];
}

// title/subtitle/summary/details live in translation resources
// (timeline.milestones.<id>.*); this array is render order plus the
// structural, non-prose fields.
export const timelineMilestones: TimelineMilestoneSource[] = [
  {
    id: "videplast",
    year: "2021",
    status: "completed",
    technologies: ["Angular", "TypeScript", "SQL Server"],
  },
  {
    id: "sedec",
    year: "2022",
    status: "completed",
    technologies: ["Vue", "Nuxt", "TypeScript"],
    links: [{ label: "Invest-MT", href: "https://www.investmt.com.br/pt-br" }],
  },
  {
    id: "os-systems",
    year: "2023",
    status: "completed",
  },
  {
    id: "shellhub",
    year: "2023",
    status: "completed",
    links: [{ label: "shellhub.io", href: "https://www.shellhub.io/" }],
  },
  {
    id: "aws-cloud-practitioner",
    year: "2024",
    status: "completed",
  },
  {
    id: "engineering-growth",
    year: "2025",
    status: "completed",
  },
  {
    id: "portfolio-rebranding",
    year: "Today",
    status: "completed",
  },
  {
    id: "alexandryn",
    year: "Today",
    status: "in-progress",
    technologies: [
      "Go",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Electron",
      "Docker",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Alexandryn/alexandryn" },
    ],
  },
  {
    id: "kubernetes-cka",
    year: "Today",
    status: "in-progress",
  },
  {
    id: "aws-developer",
    year: "Today",
    status: "in-progress",
  },
  {
    id: "mens-flexibility-app",
    year: "Today",
    status: "in-progress",
  },
  {
    id: "most-boring-project",
    year: "Today",
    status: "in-progress",
  },
  {
    id: "technical-writing",
    year: "Today",
    status: "in-progress",
  },
  {
    id: "kubernetes-operators",
    year: "Future",
    status: "planned",
  },
  {
    id: "platform-engineering",
    year: "Future",
    status: "planned",
  },
  {
    id: "distributed-systems",
    year: "Future",
    status: "planned",
  },
  {
    id: "open-source",
    year: "Future",
    status: "planned",
  },
  {
    id: "saas-products",
    year: "Future",
    status: "planned",
  },
  {
    id: "conference-talks",
    year: "Future",
    status: "planned",
  },
];

// The fully-resolved shape TimelineItem renders — Timeline.tsx builds one
// of these per source entry by merging translated title/subtitle/summary/
// details in. Kept as a separate type (not the source array's own shape)
// so TimelineItem stays agnostic to where its strings came from.
export interface TimelineMilestone extends TimelineMilestoneSource {
  title: string;
  subtitle?: string;
  summary: string;
  details?: string;
}
