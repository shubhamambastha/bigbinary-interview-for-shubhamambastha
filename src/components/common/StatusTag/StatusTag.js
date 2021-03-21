import React from "react";
import PropTypes from "prop-types";

/**
 * Primary UI component for Launch Status
 */
export const StatusTag = ({ className, type, children, ...props }) => {
  let statusClassName = "";
  switch (type) {
    case "Success":
      statusClassName = "bg-success text-success";
      break;
    case "Upcoming":
      statusClassName = "bg-pending text-pending";
      break;
    case "Failed":
      statusClassName = "bg-warning text-warning";
      break;
    default:
      statusClassName = "bg-success text-success";
      break;
  }

  return (
    <div className="flex justify-center" {...props}>
      <div
        className={`${className} ${statusClassName} px-3 py-1 text-center rounded-full font-medium text-xs inline-block`}
      >
        {children}
      </div>
    </div>
  );
};

StatusTag.propTypes = {
  /**
   * tailwind class
   */
  className: PropTypes.string,
  /**
   * Status type
   */
  type: PropTypes.string,
};
