import React from "react";
import PropTypes from "prop-types";
import { DateRangePicker } from "react-date-range";
import { customRanges } from "./CustomRange";

const Calendar = ({
  open,
  handleClose,
  selectedDates,
  onDateChange,
  ...rest
}) => {
  if (!open) return null;

  return (
    <div
      {...rest}
      className="fixed bottom-0 inset-x-0 px-8 pb-4 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        className="bg-white flex overflow-auto animate-modal max-w-3xl rounded-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        style={{ maxHeight: "calc(100% - 200px)" }}
      >
        <DateRangePicker
          onChange={(item) => onDateChange(item.selection)}
          showSelectionPreview={false}
          moveRangeOnFirstSelection={false}
          showMonthAndYearPickers={true}
          months={2}
          ranges={[selectedDates]}
          direction="horizontal"
          staticRanges={customRanges}
          inputRanges={[]}
          displayMode="date"
          showDateDisplay={false}
          fixedHeight={true}
          className="my-3 mx-1"
          weekdayDisplayFormat="EEEEEE"
          monthDisplayFormat="MMMM yyyy"
        />
      </div>
    </div>
  );
};

Calendar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  selectedDates: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default Calendar;
