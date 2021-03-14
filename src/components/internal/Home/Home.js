import React, { useState, useEffect } from "react";
import TableWrapper from "../TableWrapper";
import { CalendarIcon, ChevronDown, FilterIcon } from "../../../_helpers/Icons";
import Calendar from "../../common/Calendar";
import DropDownMenu from "../../common/DropDownMenu";
import { defineds } from "../../common/Calendar/CustomRange";
import { isAfter, formatISO } from "date-fns";
import queryString from "query-string";
import { useRouter } from "next/router";
import { getDateLabel } from "../../../_helpers/Functions";

const Home = (props) => {
  const [urlState, setUrlState] = useState({});
  const [openCalendar, setOpenCalendar] = useState(false);
  const [filterName, setFilterName] = useState("Select Dates");
  const [statusLabel, setStatusLabel] = useState("All Launches");
  const [statusValue, setStatusValue] = useState("all");
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
    const url = {
      ...urlState,
      page: 1,
      status: statusValue,
    };
    stateUrlUpdate(url);
  }, [statusValue]);

  /**
   * Use effect to set selected dates in query and in label
   */
  useEffect(() => {
    if (isAfter(selectedDates.endDate, selectedDates.startDate)) {
      const url = {
        ...urlState,
        page: 1,
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
        <DropDownMenu
          icon={<FilterIcon />}
          title={statusLabel}
          options={[
            {
              value: "all",
              label: "All Launches",
              onClick: (e) => {
                setStatusValue(e.value);
                setStatusLabel(e.label);
              },
            },
            {
              value: "upcoming",
              label: "Upcoming Launches",
              onClick: (e) => {
                setStatusValue(e.value);
                setStatusLabel(e.label);
              },
            },
            {
              value: "success",
              label: "Successful Launches",
              onClick: (e) => {
                setStatusValue(e.value);
                setStatusLabel(e.label);
              },
            },
            {
              value: "failure",
              label: "Failed Launches",
              onClick: (e) => {
                setStatusValue(e.value);
                setStatusLabel(e.label);
              },
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
          setFilterName,
        }}
      />
      <Calendar open={openCalendar} {...{ selectedDates, setSelectedDates }} />
    </div>
  );
};

export default Home;
