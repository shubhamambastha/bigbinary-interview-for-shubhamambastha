import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useEscPress } from "../../../hooks/useEscPress";
import { ChevronDown, FilterIcon } from "../../../_helpers/Icons";

function DropDownMenu({
  icon,
  options,
  menuClass,
  value,
  onOptionClick,
  ...rest
}) {
  const [isOpen, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const containerRef = useOutsideClick(() => setOpen(false), isOpen);
  useEscPress(() => setOpen(false), isOpen);

  function shareRef(...refs) {
    return (thing) => {
      refs.forEach((ref) => (ref.current = thing));
    };
  }

  useEffect(() => {
    setTitle(options.find((el) => el.value === value).label);
  }, [value]);

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
                onClick={() => onOptionClick(option)}
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
  value: "option1",
  menuClass: "text-primary font-medium flex",
  onOptionClick: () => console.log("option1 clicked"),
  options: [
    {
      value: "option1",
      label: "option1",
    },
    {
      value: "option2",
      label: "option2",
    },
  ],
};

DropDownMenu.propTypes = {
  value: PropTypes.string.isRequired,
  menuClass: PropTypes.string,
  icon: PropTypes.node,
  onOptionClick: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DropDownMenu;
