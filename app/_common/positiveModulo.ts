export function positiveModulo(n: number, m: number): number {
  return ((n % m) + m) % m;
}
