/** Two-digit counter text: 1 becomes "01". */
export const pad = (n: number): string => String(n).padStart(2, '0');
