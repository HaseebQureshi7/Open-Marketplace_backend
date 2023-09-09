export function ReturnCurrentMonth(): string {
  const now = new Date();
  const monthOptions: Intl.DateTimeFormatOptions = { month: "long" };
  return now.toLocaleDateString(undefined, monthOptions);
}
