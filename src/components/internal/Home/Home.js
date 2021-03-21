import React, { useState } from "react";
import TableWrapper from "../TableWrapper";
import { CalendarIcon, ChevronDown, FilterIcon } from "../../../_helpers/Icons";
import Calendar from "../../common/Calendar";
import DropDownMenu from "../../common/DropDownMenu";
import { defineds } from "../../common/Calendar/CustomRange";
import { isAfter, formatISO } from "date-fns";
import queryString from "query-string";
import { useRouter } from "next/router";

const Home = (props) => {
  const [urlState, setUrlState] = useState({});
  const [openCalendar, setOpenCalendar] = useState(false);
  const [filterName, setFilterName] = useState("Select Dates");
  const [statusValue, setStatusValue] = useState("all");
  const [selectedDates, setSelectedDates] = useState({
    startDate: defineds.endOfLastSixMonth,
    endDate: defineds.startOfLastSixMonth,
    key: "selection",
  });

  const router = useRouter();

  /**
   * Function to set selected dates in query and in label
   */
  const onStatusChange = (elem) => {
    const url = {
      ...urlState,
      page: 1,
      status: elem.value,
    };
    stateUrlUpdate(url);
  };

  /**
   * Function to set selected dates in query and in label
   */
  const onDateChange = (dates) => {
    if (isAfter(dates.endDate, dates.startDate)) {
      const url = {
        ...urlState,
        page: 1,
        dateStart: formatISO(dates.startDate),
        dateEnd: formatISO(dates.endDate),
      };
      stateUrlUpdate(url);
      setOpenCalendar(false);
    }
  };

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
        <DropDownMenu
          value={statusValue}
          icon={<FilterIcon />}
          onOptionClick={(e) => onStatusChange(e)}
          options={[
            {
              value: "all",
              label: "All Launches",
            },
            {
              value: "upcoming",
              label: "Upcoming Launches",
            },
            {
              value: "success",
              label: "Successful Launches",
            },
            {
              value: "failure",
              label: "Failed Launches",
            },
          ]}
          menuClass="text-primary font-medium flex cursor-pointer"
          className="flex items-center py-1"
        />
      </div>
      <TableWrapper
        {...{
          stateUrlUpdate,
          urlState,
          setUrlState,
          setFilterName,
          setSelectedDates,
          setStatusValue,
        }}
      />
      <Calendar open={openCalendar} {...{ selectedDates, onDateChange }} />
    </div>
  );
};

export default Home;
