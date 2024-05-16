export const getFormattedDuration = (duration: string) => {
  switch (duration) {
    case "1w":
      return "일주일";
    case "1m":
      return "한달";
    case "3m":
      return "3개월";
    case "6m":
      return "6개월";
    default:
      return "미정";
  }
};
