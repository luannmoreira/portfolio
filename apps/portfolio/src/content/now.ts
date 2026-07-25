export interface NowItem {
  title: string;
  description: string;
}

export const nowLastUpdated = "July 2026";

export const nowItems: NowItem[] = [
  {
    title: "Rebranding as a software engineer",
    description:
      'Moving the narrative away from "just a frontend developer" — this website, its architecture, and its writing are part of that effort.',
  },
  {
    title: "Studying for the Kubernetes CKA",
    description:
      "Certified Kubernetes Administrator — deepening the platform engineering side of things.",
  },
  {
    title: "Studying for the AWS Developer certification",
    description: "Rounding out the cloud-native side of the same push.",
  },
  {
    title: "Writing for this blog",
    description:
      "Publishing articles that show the actual reasoning behind engineering decisions, not just the how-to.",
  },
  {
    title: '"The Most Boring Project Ever"',
    description:
      "A deliberately simple notification system — the twist is building it with genuinely cutting-edge, trending technology to show off architectural thinking on the simplest possible problem.",
  },
];
