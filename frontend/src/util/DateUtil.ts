export const toFormatDate = (x: Date): string => {
  return x.toISOString().split("T")[0];
};

export const fromFormatDate = (x: string): Date | null => {
  const number: number = Date.parse(x);
  if (isNaN(number)) {
    return null;
  }
  return new Date(number);
};
