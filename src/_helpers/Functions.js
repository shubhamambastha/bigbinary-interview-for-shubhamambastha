import { format } from "date-fns";
import { customRanges } from "../components/common/Calendar/CustomRange";
import _ from "lodash";

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

export const getDisplayValue = (value) =>
  _.isEmpty(value) ? (
    <span className="bg-secondary text-secondary p-2 rounded-md">NA</span>
  ) : (
    value
  );
