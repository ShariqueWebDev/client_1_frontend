// utils/formatDate.js
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
