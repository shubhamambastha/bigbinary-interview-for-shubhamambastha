import { format, formatISO } from "date-fns";
import { customRanges } from "../components/common/Calendar/CustomRange";
import _ from "lodash";

export const getDateLabel = (dateStart, dateEnd) => {
  let label = "";
  let rangeDate = customRanges.find(
    (dateRange) =>
      formatISO(dateRange.range().startDate) === formatISO(dateStart) &&
      formatISO(dateRange.range().endDate) === formatISO(dateEnd)
  );
  if (rangeDate?.label) {
    label = rangeDate.label;
  } else {
    label = `${format(new Date(dateStart), "dd/MM/yyyy")}-${format(
      new Date(dateEnd),
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
