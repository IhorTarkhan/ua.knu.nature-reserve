const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

export const toJsonDataParam = (x: Date | string): string => {
  const date = new Date(x);
  const result = new Date(
    date.getTime() - date.getTimezoneOffset() * 60 * 1000
  );
  return result.toISOString();
};

export const toShortFormatDate = (x: Date | string): string => {
  return new Date(x).toISOString().split("T")[0];
};

export const toLongFormatDate = (x: Date | string): string => {
  return new Date(x).toLocaleDateString("en-US", options);
};

export const fromFormatDate = (x: string): Date | null => {
  const number: number = Date.parse(x);
  if (isNaN(number)) {
    return null;
  }
  return new Date(number);
};
