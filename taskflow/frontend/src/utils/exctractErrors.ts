export function extractErrors(
  data?: Record<string, string[]>
): string[] {
  if (!data) return [];

  return Object.entries(data).flatMap(([key, messages]) =>
    messages.map(msg => {
      if (key === "email" || key === "confirm_password") return msg;

      const field = key
        .replace(/_/g, " ")
        .replace(/^\w/, c => c.toUpperCase());

      return `${field}: ${msg}`;
    })
  );
}
