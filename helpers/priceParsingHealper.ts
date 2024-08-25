export function parsePrice(price: string): number {
  const trimmedPrice = price.trim();

  return parseFloat(trimmedPrice.split('$')[1]);
  // return parseFloat(trimmedPrice.slice(1));
}
