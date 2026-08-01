import { withLocale } from "./withLocale";

test("appends ?lang= when the url has no query string yet", () => {
  expect(withLocale("/about", "pt-BR")).toBe("/about?lang=pt-BR");
});

test("appends &lang= when the url already has a query string", () => {
  expect(withLocale("/about?theme=dark", "pt-BR")).toBe(
    "/about?theme=dark&lang=pt-BR"
  );
});
