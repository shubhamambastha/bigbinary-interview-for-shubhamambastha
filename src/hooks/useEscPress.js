import React from "react";

export function useEscPress(onEscPress, isActive) {
  React.useEffect(() => {
    if (!isActive) {
      return;
    }

    function listener(e) {
      if (e.key === "Escape") {
        onEscPress();
      }
    }

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [isActive]);
}
