export const timeUntilNext = (minutes) => {
  const now = new Date();
  const currentMinutes = now.getUTCMinutes();
  const seconds = now.getUTCSeconds();

  // Calculate how many seconds until the next specified minutes
  const untilNext = (minutes - (currentMinutes % minutes)) * 60 - seconds;

  return untilNext;
};

export const getLocalTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
