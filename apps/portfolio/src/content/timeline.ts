export type TimelineStatus = "completed" | "in-progress" | "planned";

export interface TimelineLink {
  label: string;
  href: string;
}

export interface TimelineMilestone {
  /** Slug used for the #hash deep link and the DOM id. */
  id: string;
  /** Grouping label rendered as a year heading above the first milestone
   * of each group. */
  year: string;
  status: TimelineStatus;
  title: string;
  subtitle?: string;
  /** Collapsed-card description. */
  summary: string;
  /** Expanded-card description; falls back to summary when absent. */
  details?: string;
  technologies?: string[];
  links?: TimelineLink[];
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "videplast",
    year: "2021",
    status: "completed",
    title: "Videplast",
    subtitle: "Software Developer",
    summary:
      "Built internal intranet applications supporting manufacturing operations, inventory management, and internal business workflows.",
    technologies: ["Angular", "TypeScript", "SQL Server"],
  },
  {
    id: "sedec",
    year: "2022",
    status: "completed",
    title: "SEDEC",
    subtitle: "Software Developer",
    summary:
      "Developed public-facing government applications, creating features used by businesses and citizens across Mato Grosso.",
    details:
      "Developed public-facing government applications including Invest-MT, creating features used by businesses and citizens across Mato Grosso.",
    technologies: ["Vue", "Nuxt", "TypeScript"],
    links: [{ label: "Invest-MT", href: "https://www.investmt.com.br/pt-br" }],
  },
  {
    id: "os-systems",
    year: "2023",
    status: "completed",
    title: "OS Systems",
    subtitle: "Frontend Engineer",
    summary:
      "Worked on enterprise applications using React and TypeScript while improving frontend architecture and developer experience.",
  },
  {
    id: "shellhub",
    year: "2023",
    status: "completed",
    title: "ShellHub",
    subtitle: "Open Source Contributor",
    summary:
      "Contributed to ShellHub's frontend ecosystem by implementing new features, improving architecture, and helping standardize testing practices.",
    links: [{ label: "shellhub.io", href: "https://www.shellhub.io/" }],
  },
  {
    id: "aws-cloud-practitioner",
    year: "2024",
    status: "completed",
    title: "AWS Cloud Practitioner",
    summary:
      "Earned my first AWS certification, beginning my transition toward cloud-native software engineering.",
  },
  {
    id: "engineering-growth",
    year: "2025",
    status: "completed",
    title: "Engineering Growth",
    summary:
      "Focused on software architecture, frontend scalability, testing strategies, clean code, and engineering best practices.",
  },
  {
    id: "portfolio-rebranding",
    year: "Today",
    status: "in-progress",
    title: "Portfolio Rebranding",
    summary:
      "Rebuilding my portfolio to better represent myself as a software engineer instead of simply a frontend developer.",
  },
  {
    id: "kubernetes-cka",
    year: "Today",
    status: "in-progress",
    title: "Kubernetes CKA",
    summary:
      "Studying for the Certified Kubernetes Administrator certification to deepen my platform engineering knowledge.",
  },
  {
    id: "aws-developer",
    year: "Today",
    status: "in-progress",
    title: "AWS Developer",
    summary: "Preparing for the AWS Developer Associate certification.",
  },
  {
    id: "mens-flexibility-app",
    year: "Today",
    status: "in-progress",
    title: "Men's Flexibility App",
    summary:
      "Building a mobility and flexibility platform specifically designed around men's musculature and limitations.",
  },
  {
    id: "most-boring-project",
    year: "Today",
    status: "in-progress",
    title: "The Most Boring Project Ever",
    summary:
      "Designing an intentionally simple notification platform built with enterprise-grade architecture to demonstrate distributed systems, event-driven design, containerization, and scalability.",
  },
  {
    id: "technical-writing",
    year: "Today",
    status: "in-progress",
    title: "Technical Writing",
    summary:
      "Publishing articles focused on engineering decisions, architecture, trade-offs, and software design rather than simple tutorials.",
  },
  {
    id: "kubernetes-operators",
    year: "Future",
    status: "planned",
    title: "Kubernetes Operators",
    summary: "Build production-ready Kubernetes operators.",
  },
  {
    id: "platform-engineering",
    year: "Future",
    status: "planned",
    title: "Platform Engineering",
    summary:
      "Expand into platform engineering, infrastructure automation, and cloud-native systems.",
  },
  {
    id: "distributed-systems",
    year: "Future",
    status: "planned",
    title: "Distributed Systems",
    summary:
      "Develop expertise in event-driven architectures, messaging systems, and large-scale backend design.",
  },
  {
    id: "open-source",
    year: "Future",
    status: "planned",
    title: "Open Source",
    summary: "Launch and maintain meaningful open-source projects.",
  },
  {
    id: "saas-products",
    year: "Future",
    status: "planned",
    title: "SaaS Products",
    summary: "Build and launch independent SaaS businesses.",
  },
  {
    id: "conference-talks",
    year: "Future",
    status: "planned",
    title: "Conference Talks",
    summary:
      "Share engineering knowledge through technical talks and community events.",
  },
];
