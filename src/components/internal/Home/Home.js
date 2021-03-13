import React, { useState, useEffect } from "react";
import TableWrapper from "../TableWrapper";
import queryString from "query-string";
import { useRouter } from "next/router";

const Home = (props) => {
  const [urlState, setUrlState] = useState({});
  const router = useRouter();

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
      <TableWrapper
        {...{
          stateUrlUpdate,
          urlState,
          setUrlState,
        }}
      />
    </div>
  );
};

export default Home;
