import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import queryString from "query-string";
import { useRouter } from "next/router";
import { API } from "../../../network/API";
import Table from "../../common/Table";
import Pagination from "../../common/Pagination";

const TableWrapper = ({}) => {
  const [launchData, setLaunchData] = useState([]);
  const [urlState, setUrlState] = useState({});
  const [triggerListing, setTriggerListing] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    perPageCount: 12,
    totalPage: 1,
    currentPage: 1,
  });

  const router = useRouter();

  /**
   * This function will get launch datas according to query
   */
  const getLaunches = async ({ query, page }) => {
    const { data, error } = await API.post(`/`, {
      query: query,
      options: {
        limit: pageInfo?.perPageCount,
        page: page,
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

  /**
   * This use Effect triggers when router param has changed
   */
  useEffect(() => {
    let query = {};
    let page = router?.query?.page ? Number(router?.query?.page) : 1;
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
        $gte: router?.query?.dateStart,
        $lte: router?.query?.dateEnd,
      };
    }

    setTriggerListing(true);
    getLaunches({ query, page });
  }, [router.query]);

  return (
    <div className="text-2xl font-bold mt-12 max-w-240 mx-auto">
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
            "Launch Status",
            "Rocket",
          ]}
          rowContent={launchData.map((data, idx) => [
            <p>{(idx + 1).toString().padStart(2, "0")}</p>,
            <p>{format(new Date(data?.date_utc), "dd MMM yyyy HH:mm")}</p>,
            <p>{data?.launchpad?.name}</p>,
            <p>{data?.name}</p>,
            <p>{data?.payloads[0]?.orbit}</p>,
            <p>
              {data?.upcoming
                ? "Upcoming"
                : data?.success
                ? "Success"
                : "Fails"}
            </p>,
            <p>{data?.rocket?.name}</p>,
          ])}
          loading={triggerListing}
        />
      </Pagination>
    </div>
  );
};

export default TableWrapper;
