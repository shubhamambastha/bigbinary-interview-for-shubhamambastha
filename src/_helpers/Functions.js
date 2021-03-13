import { format } from "date-fns";
import { customRanges } from "../components/common/Calendar/CustomRange";

export const getDateLabel = (dateStart, dateEnd) => {
  let label = "";
  let rangeDate = customRanges.find(
    (dateRange) =>
      dateRange.range().startDate === dateStart &&
      dateRange.range().endDate === dateEnd
  );
  if (rangeDate?.label) {
    label = rangeDate.label;
  } else {
    label = `${format(dateStart, "dd/MM/yyyy")}-${format(
      dateEnd,
      "dd/MM/yyyy"
    )}`;
  }
  return label;
};
