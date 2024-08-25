export function calculateTax(price: number): number {
  const taxRate = 0.08;

  return parseFloat((price * taxRate).toFixed(2));
}
