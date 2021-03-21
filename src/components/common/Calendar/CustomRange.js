import {
  addDays,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  addYears,
  startOfYear,
  endOfYear,
  isSameDay,
} from "date-fns";

export const defineds = {
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfLastThreeMonth: startOfMonth(addMonths(new Date(), -3)),
  endOfLastThreeMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfLastSixMonth: startOfMonth(addMonths(new Date(), -6)),
  endOfLastSixMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfLastYear: startOfYear(addYears(new Date(), -1)),
  endOfLastYear: endOfYear(addYears(new Date(), -1)),
  startOfLastTwoYear: startOfYear(addYears(new Date(), -2)),
  endOfLastTwoYear: endOfYear(addYears(new Date(), -1)),
};

const rangeHandler = {
  range: {},
  isSelected(range) {
    const definedRange = this.range();
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
};

export function createRanges(ranges) {
  return ranges.map((range) => ({ ...rangeHandler, ...range }));
}

export const customRanges = createRanges([
  {
    label: "Past Week",
    range: () => ({
      startDate: defineds.startOfLastWeek,
      endDate: defineds.endOfLastWeek,
    }),
  },
  {
    label: "Past Month",
    range: () => ({
      startDate: defineds.startOfLastMonth,
      endDate: defineds.endOfLastMonth,
    }),
  },
  {
    label: "Past 3 Month",
    range: () => ({
      startDate: defineds.startOfLastThreeMonth,
      endDate: defineds.endOfLastThreeMonth,
    }),
  },
  {
    label: "Past 6 Month",
    range: () => ({
      startDate: defineds.startOfLastSixMonth,
      endDate: defineds.endOfLastSixMonth,
    }),
  },
  {
    label: "Past Year",
    range: () => ({
      startDate: defineds.startOfLastYear,
      endDate: defineds.endOfLastYear,
    }),
  },
  {
    label: "Past 2 Year",
    range: () => ({
      startDate: defineds.startOfLastTwoYear,
      endDate: defineds.endOfLastTwoYear,
    }),
  },
]);
