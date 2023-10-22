export const formatVideoTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.round(totalSeconds % 60);
  const formattedTime = `${hours}:${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
  return formattedTime;
};
