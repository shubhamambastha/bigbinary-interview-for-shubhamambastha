import React from "react";
import { CompanyLogo } from "../../../_helpers/Icons";

const Header = () => {
  return (
    <div className="h-full">
      <div className="w-full p-5 flex justify-center items-center bg-white z-20">
        <CompanyLogo className="w-64 h-8" />
      </div>
    </div>
  );
};

export default Header;
