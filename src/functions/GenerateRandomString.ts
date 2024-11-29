export function GenerateRandomString(): string {
  return Array.from(Array(20), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");
}
