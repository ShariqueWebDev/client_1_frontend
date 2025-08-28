// utils/formatDate.js
// DATE FORMATTER
export function formatDate(dateString, withTime = false) {
  if (!dateString) return "";

  const options = withTime
    ? {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    : {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };

  return new Date(dateString).toLocaleString("en-IN", options);
}

// PRICE FORMATTER
export function formatePrice(amount, currency = "INR") {
  if (!amount && amount !== 0) return "";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
