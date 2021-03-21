import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import LaunchDetailModal from "../../common/LaunchDetailModal";

const LaunchDetailWrapper = ({
  openLaunchModal,
  setOpenLaunchModal,
  setLaunchDetailData,
  detailDataLoading,
  launchDetailData,
}) => {
  return (
    <LaunchDetailModal
      open={openLaunchModal}
      handleClose={() => {
        setOpenLaunchModal(false);
        setLaunchDetailData({});
      }}
      isLoading={detailDataLoading}
      imageUrl={launchDetailData?.links?.patch?.small}
      missionName={launchDetailData?.name}
      status={
        launchDetailData?.upcoming
          ? "Upcoming"
          : launchDetailData?.success
          ? "Success"
          : "Failed"
      }
      rocketName={launchDetailData?.rocket?.name}
      links={{
        nasa: launchDetailData?.links?.presskit,
        wikipedia: launchDetailData?.links?.wikipedia,
        youtube: launchDetailData?.links?.webcast,
      }}
      flightNumber={launchDetailData?.flight_number}
      details={launchDetailData?.details}
      rocketType={launchDetailData?.rocket?.engines?.type}
      manufacturer={launchDetailData?.rocket?.company}
      country={launchDetailData?.rocket?.country}
      date={
        launchDetailData?.date_utc &&
        format(new Date(launchDetailData?.date_utc), "dd MMM yyyy HH:mm")
      }
      payloadType={
        launchDetailData?.payloads && launchDetailData?.payloads.length
          ? launchDetailData?.payloads[0]?.type
          : ""
      }
      orbit={
        launchDetailData?.payloads && launchDetailData?.payloads.length
          ? launchDetailData?.payloads[0]?.orbit
          : ""
      }
      launchSite={launchDetailData?.launchpad?.name}
    />
  );
};

LaunchDetailWrapper.propTypes = {
  openLaunchModal: PropTypes.bool,
  setOpenLaunchModal: PropTypes.func,
  setLaunchDetailData: PropTypes.func,
  detailDataLoading: PropTypes.bool,
  launchDetailData: PropTypes.object,
};

export default LaunchDetailWrapper;
