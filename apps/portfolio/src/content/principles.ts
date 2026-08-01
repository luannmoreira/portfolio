export interface Principle {
  id: string;
}

// title/desc live in translation resources (principles.items.<id>.*); this
// array is just render order + the stable id used to look them up.
export const principles: Principle[] = [
  { id: "reliability-first" },
  { id: "decoupled-architecture" },
  { id: "performance-budgeting" },
  { id: "self-documenting-code" },
];
