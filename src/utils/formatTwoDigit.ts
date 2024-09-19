export function formatToTwoDigits(num?: number): string {
  const safeNum = num ?? 0;
  return safeNum.toString().padStart(2, '0');
}
