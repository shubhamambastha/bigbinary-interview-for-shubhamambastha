import React from "react";
import Header from "../../common/Header";

const Layout = ({ children, customMetadata = {} }) => {
  return (
    <div>
      {/* Header Container */}
      <div className="w-full z-50">
        <Header />
      </div>

      {/* Content Container */}
      <div className="content w-full">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
