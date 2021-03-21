import React from "react";

export function useOutsideClick(onOutsideClick, isActive) {
  const containerRef = React.useRef();
  const handler = React.useRef();
  handler.current = onOutsideClick;

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (!isActive) {
      return;
    }

    function listener(e) {
      if (!containerRef.current.contains(e.target)) {
        handler.current();
      }
    }

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, [isActive]);

  return containerRef;
}
