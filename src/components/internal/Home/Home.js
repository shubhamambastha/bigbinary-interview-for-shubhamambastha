import React, { useState, useEffect } from "react";
import TableWrapper from "../TableWrapper";
import { CalendarIcon, ChevronDown } from "../../../_helpers/Icons";
import Calendar from "../../common/Calendar";
import { defineds } from "../../common/Calendar/CustomRange";
import { isAfter, formatISO } from "date-fns";
import queryString from "query-string";
import { useRouter } from "next/router";
import { getDateLabel } from "../../../_helpers/Functions";

const Home = (props) => {
  const [urlState, setUrlState] = useState({});
  const [openCalendar, setOpenCalendar] = useState(false);
  const [filterName, setFilterName] = useState("Select Dates");
  const [selectedDates, setSelectedDates] = useState({
    startDate: defineds.endOfLastSixMonth,
    endDate: defineds.startOfLastSixMonth,
    key: "selection",
  });

  const router = useRouter();

  /**
   * Use effect to set selected dates in query and in label
   */
  useEffect(() => {
    if (isAfter(selectedDates.endDate, selectedDates.startDate)) {
      const url = {
        ...urlState,
        dateStart: formatISO(selectedDates.startDate),
        dateEnd: formatISO(selectedDates.endDate),
      };
      stateUrlUpdate(url);
      setOpenCalendar(false);
      setFilterName(
        getDateLabel(selectedDates.startDate, selectedDates.endDate)
      );
    }
  }, [selectedDates]);

  /**
   * @description This function is used to update the url state
   * @param {*} urlState
   */
  const stateUrlUpdate = (urlState) => {
    setUrlState(urlState);
    const queryParam = `?${queryString.stringify(urlState)}`;
    router.push(`/${queryParam}`, `/${queryParam}`, {
      shallow: true,
    });
  };

  return (
    <div className="w-full max-w-240 mx-auto">
      <div className="mt-12 w-full flex justify-between">
        <div
          onClick={() => setOpenCalendar(true)}
          className="flex space-x-3 items-center hover:bg-secondary rounded py-1 cursor-pointer"
        >
          <CalendarIcon />
          <span className="font-medium">{filterName}</span>
          <ChevronDown />
        </div>
        <div></div>
      </div>
      <TableWrapper
        {...{
          stateUrlUpdate,
          urlState,
          setUrlState,
        }}
      />
      <Calendar open={openCalendar} {...{ selectedDates, setSelectedDates }} />
    </div>
  );
};

export default Home;
