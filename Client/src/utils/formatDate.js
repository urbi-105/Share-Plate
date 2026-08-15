export const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (time) => {
  if (!time) return "N/A";

  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};