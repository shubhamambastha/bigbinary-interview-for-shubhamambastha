import React from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "../../../_helpers/Icons";
import { getDisplayValue } from "../../../_helpers/Functions";
import StatusTag from "../StatusTag";

const LaunchDetailModal = ({
  open,
  handleClose,
  imageUrl,
  missionName,
  status,
  rocketName,
  links,
  flightNumber,
  details,
  rocketType,
  manufacturer,
  country,
  date,
  payloadType,
  orbit,
  launchSite,
  isLoading,
  ...rest
}) => {
  if (!open) return null;
  return (
    <div
      {...rest}
      className="fixed bottom-0 inset-x-0 px-8 pb-4 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        className="bg-white flex flex-col w-full overflow-auto rounded-md relative animate-modal p-8 max-w-136 text-primary font-medium"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
        style={{ maxHeight: "calc(100% - 50px)" }}
      >
        <button
          type="button"
          onClick={handleClose}
          className="right-6 top-6 absolute focus:outline-none"
        >
          <CloseIcon className="w-3 h-4" />
        </button>
        <div
          className={` flex flex-col w-full ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          <div className="flex space-x-6">
            <div
              className={`w-18 h-18 object-contain overflow-hidden ${
                isLoading ? "bg-gray-200 rounded" : ""
              }`}
            >
              <img
                className={`w-full h-full ${isLoading ? "hidden" : ""}`}
                src={imageUrl}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <div className="flex space-x-4">
                <p
                  className={`text-lg font-regular ${
                    isLoading ? "w-24 h-4 bg-gray-200 rounded" : ""
                  }`}
                >
                  {missionName}
                </p>
                {!isLoading && <StatusTag type={status}>{status}</StatusTag>}
              </div>
              <div
                className={`text-xs ${
                  isLoading ? "w-24 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {rocketName}
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 object-contain overflow-hidden">
                  <a href={links?.nasa} target="_blank">
                    <img
                      className="w-full h-full"
                      src="https://testshubham24.s3.us-east-1.amazonaws.com/nasa.png"
                    />
                  </a>
                </div>
                <div className="w-4 h-4 object-contain overflow-hidden">
                  <a href={links?.wikipedia} target="_blank">
                    <img
                      className="w-full h-full"
                      src="https://testshubham24.s3.us-east-1.amazonaws.com/wikipedia.png"
                    />
                  </a>
                </div>
                <div className="w-4 h-4 object-contain overflow-hidden">
                  <a href={links?.youtube} target="_blank">
                    <img
                      className="w-full h-full"
                      src="https://testshubham24.s3.us-east-1.amazonaws.com/youtube.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <p
            style={{ lineHeight: "24px" }}
            className={`text-sm my-4 font-regular ${
              isLoading ? "w-full h-16 bg-gray-200 rounded" : ""
            }`}
          >
            {details}{" "}
            {!isLoading && (
              <a
                className="font-medium text-blue-500"
                href={links?.wikipedia}
                target="_blank"
              >
                Wikipedia
              </a>
            )}
          </p>
          <div className="flex flex-col divide-y divide-primary text-sm">
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Flight Number</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {flightNumber}
              </span>
            </div>
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Mission Name</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {missionName}
              </span>
            </div>
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Rocket Type</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {rocketType}
              </span>
            </div>
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Rocket Name</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {rocketName}
              </span>
            </div>
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Manufacturer</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {manufacturer}
              </span>
            </div>
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Nationality</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {country}
              </span>
            </div>
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Launch Date</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {date}
              </span>
            </div>
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Payload Type</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {payloadType}
              </span>
            </div>
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Orbit</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {getDisplayValue(orbit)}
              </span>
            </div>
            <div className="flex py-4 space-x-5">
              <span className="w-1/3">Launch Site</span>
              <span
                className={`font-regular ${
                  isLoading ? "w-16 h-4 bg-gray-200 rounded" : ""
                }`}
              >
                {launchSite}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetailModal;

LaunchDetailModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  imageUrl: PropTypes.string,
  missionName: PropTypes.string,
  status: PropTypes.string,
  rocketName: PropTypes.string,
  links: PropTypes.shape({
    nasa: PropTypes.string,
    wikipedia: PropTypes.string,
    youtube: PropTypes.string,
  }),
  flightNumber: PropTypes.bool,
  details: PropTypes.string,
  rocketType: PropTypes.string,
  manufacturer: PropTypes.string,
  country: PropTypes.string,
  date: PropTypes.string,
  payloadType: PropTypes.string,
  orbit: PropTypes.string,
  launchSite: PropTypes.string,
  isLoading: PropTypes.bool,
};
