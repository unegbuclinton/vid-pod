import React, { ReactNode } from "react";

const VdModal = ({
  children,
  isShown,
  hide,
}: {
  children: ReactNode;
  hide: () => void;
  isShown: boolean;
}) => {
  if (!isShown) return null;
  return (
    <div
      onClick={hide}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-15"
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default VdModal;
