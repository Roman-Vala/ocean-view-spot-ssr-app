export function formatCurrency(
  cents,
  locale = "en-AU", currency = "AUD"
) {
  if (cents == null) return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}