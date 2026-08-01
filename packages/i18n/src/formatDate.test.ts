import { formatDate } from "./formatDate";

test("formats a date using the given locale and options", () => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  expect(formatDate("2023-03-15", "en", options)).toBe(
    new Intl.DateTimeFormat("en", options).format(new Date("2023-03-15"))
  );
  expect(formatDate("2023-03-15", "pt-BR", options)).toBe(
    new Intl.DateTimeFormat("pt-BR", options).format(new Date("2023-03-15"))
  );
});

test("produces different output for different locales given the same date", () => {
  const options: Intl.DateTimeFormatOptions = { month: "long" };

  expect(formatDate("2023-03-15", "en", options)).not.toBe(
    formatDate("2023-03-15", "pt-BR", options)
  );
});
