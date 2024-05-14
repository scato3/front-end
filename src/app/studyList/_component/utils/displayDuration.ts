import moment from "moment";

export default function DisplayDuration(selectedDate: string | null, selectedDuration: string | null) {
  const startDate = moment(selectedDate);
  let endDate;

  if (selectedDuration === "미정") {
    endDate = "미정";
  } else {
    switch (selectedDuration) {
      case "1w":
        endDate = moment(selectedDate).add(1, "weeks");
        break;
      case "1m":
        endDate = moment(selectedDate).add(1, "months");
        break;
      case "3m":
        endDate = moment(selectedDate).add(3, "months");
        break;
      case "6m":
        endDate = moment(selectedDate).add(6, "months");
        break;
      default:
        endDate = null;
        break;
    }

    if (endDate) {
      endDate = endDate.format("MM.DD");
    } else {
      endDate = "미정";
    }
  }

  return `${startDate.format("MM.DD")} - ${endDate}`;
}
