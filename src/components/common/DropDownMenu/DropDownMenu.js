import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useEscPress } from "../../../hooks/useEscPress";
import { ChevronDown, FilterIcon } from "../../../_helpers/Icons";

function DropDownMenu({ icon, title, options, menuClass, ...rest }) {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useOutsideClick(() => setOpen(false), isOpen);
  useEscPress(() => setOpen(false), isOpen);

  function shareRef(...refs) {
    return (thing) => {
      refs.forEach((ref) => (ref.current = thing));
    };
  }

  return (
    <div {...rest}>
      <div
        className={menuClass}
        onClick={() => setOpen(!isOpen)}
        ref={shareRef(containerRef)}
      >
        <div className="text-base flex items-center space-x-3">
          {icon}
          <div className="text-primary font-medium">{title}</div>
          <ChevronDown />
        </div>
      </div>
      {isOpen && (
        <div className="relative z-10">
          <div className="absolute bg-white rounded right-0 top-4 shadow-sm w-max">
            {options?.map((option, index) => (
              <div
                className="py-2 flex items-center px-4 text-sm text-secondary cursor-pointer hover:bg-primary"
                key={index}
                onClick={() => option?.onClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
DropDownMenu.defaultProps = {
  icon: <FilterIcon />,
  title: "Title",
  menuClass: "text-primary font-medium flex",
  options: [
    {
      value: "option1",
      label: "option1",
      onClick: () => console.log("option1 clicked"),
    },
    {
      value: "option2",
      label: "option2",
      onClick: () => console.log("option2 clicked"),
    },
  ],
};

DropDownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  menuClass: PropTypes.string,
  icon: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
};

export default DropDownMenu;
