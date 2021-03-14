import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import _ from "lodash";
import { API } from "../../../network/API";
import Table from "../../common/Table";
import Pagination from "../../common/Pagination";
import StatusTag from "../../common/StatusTag";
import LaunchDetailWrapper from "../LaunchDetailWrapper";
import { getDisplayValue, getDateLabel } from "../../../_helpers/Functions";

const TableWrapper = ({ urlState, stateUrlUpdate, setFilterName }) => {
  const [launchData, setLaunchData] = useState([]);
  const [launchDetailData, setLaunchDetailData] = useState({});
  const [openLaunchModal, setOpenLaunchModal] = useState(false);
  const [detailDataLoading, setDetailDataLoading] = useState(false);
  const [triggerListing, setTriggerListing] = useState(false);
  const [queryState, setQueryState] = useState({});

  const router = useRouter();

  const [pageInfo, setPageInfo] = useState({
    perPageCount: 12,
    totalPage: 1,
    currentPage: router?.query?.page ? Number(router?.query?.page) : 1,
  });

  /**
   * This function will get launch datas according to query
   */
  const getLaunches = async () => {
    const { data, error } = await API.post(`/`, {
      query: queryState,
      options: {
        limit: pageInfo?.perPageCount,
        page: pageInfo?.currentPage,
        select: ["date_utc", "name", "success", "upcoming"],
        populate: [
          { path: "launchpad", select: "name" },
          { path: "payloads", select: "orbit" },
          { path: "rocket", select: "name" },
        ],
      },
    });
    if (data) {
      setLaunchData(data?.docs);
      setPageInfo({
        ...pageInfo,
        totalPage: data?.totalPages,
        currentPage: data?.page,
      });
      setTriggerListing(false);
    }
    if (error) {
      console.log("error", error);
    }
  };

  /**
   * This function will get launch data from id
   */
  const getLauncheByFlight = async ({ id }) => {
    const { data, error } = await API.post(`/`, {
      query: {
        _id: id,
      },
      options: {
        select: [
          "date_utc",
          "name",
          "success",
          "upcoming",
          "details",
          "links",
          "flight_number",
        ],
        populate: [
          {
            path: "launchpad",
            select: "name",
          },
          {
            path: "payloads",
            select: ["orbit", "type"],
          },
          {
            path: "rocket",
            select: ["name", "country", "company", "engines"],
          },
        ],
      },
    });
    if (data) {
      setLaunchDetailData(data?.docs[0]);
      setDetailDataLoading(false);
    }
    if (error) {
      console.log("error", error);
    }
  };

  /**
   * Use effect to Get launch data once it get trigger
   */
  useEffect(() => {
    if (triggerListing) {
      getLaunches();
      setTriggerListing(false);
    }
  }, [triggerListing]);

  /**
   * This use Effect triggers when router param has changed
   */
  useEffect(() => {
    let query = {};
    if (router?.query?.status) {
      switch (router?.query?.status) {
        case "success":
          query = {
            ...query,
            success: true,
          };
          break;
        case "failure":
          query = {
            ...query,
            success: false,
          };
          break;
        case "upcoming":
          query = {
            ...query,
            upcoming: true,
          };
          break;

        default:
          break;
      }
    }
    if (router?.query?.dateStart || router?.query?.dateEnd) {
      query = {
        ...query,
        date_utc: {
          $gte: router?.query?.dateStart,
          $lte: router?.query?.dateEnd,
        },
      };
      setFilterName(
        getDateLabel(
          new Date(router?.query?.dateStart),
          new Date(router?.query?.dateEnd)
        )
      );
    }
    setQueryState(query);
    setTriggerListing(true);
  }, [router.query]);

  return (
    <div className="text-2xl font-bold my-12">
      <Pagination
        loading={triggerListing}
        pagination={{
          currentpage: pageInfo?.currentPage,
          totalPage: pageInfo?.totalPage,
          handlePageClick: ({ selected }) => {
            const url = {
              ...urlState,
              page: selected + 1,
            };
            stateUrlUpdate(url);
            document.documentElement.scrollTop = 0;
          },
        }}
      >
        <Table
          headers={[
            "No:",
            "Launched (UTC)",
            "Location",
            "Mission",
            "Orbit",
            <p className="text-center">Launch Status</p>,
            "Rocket",
          ]}
          rowContent={launchData.map((data, idx) => [
            <p
              className="cursor-pointer underline"
              onClick={() => {
                setDetailDataLoading(true);
                getLauncheByFlight({ id: data?.id });
                setOpenLaunchModal(true);
              }}
            >
              {(idx + 1).toString().padStart(2, "0")}
            </p>,
            <p>{format(new Date(data?.date_utc), "dd MMM yyyy HH:mm")}</p>,
            <p>{getDisplayValue(data?.launchpad?.name)}</p>,
            <p>{data?.name}</p>,
            <p>{getDisplayValue(data?.payloads[0]?.orbit)}</p>,
            <StatusTag
              type={
                data?.upcoming
                  ? "Upcoming"
                  : data?.success
                  ? "Success"
                  : "Failed"
              }
            >
              {data?.upcoming
                ? "Upcoming"
                : data?.success
                ? "Success"
                : "Failed"}
            </StatusTag>,
            <p>{data?.rocket?.name}</p>,
          ])}
          loading={triggerListing}
        />
      </Pagination>
      <LaunchDetailWrapper
        {...{
          openLaunchModal,
          setOpenLaunchModal,
          setLaunchDetailData,
          detailDataLoading,
          launchDetailData,
        }}
      />
    </div>
  );
};

export default TableWrapper;
