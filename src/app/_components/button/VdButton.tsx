import React, { ReactNode } from "react";

const VdButton = ({
  children,
  variant = "fill",
  disable,
  buttonStyles,
  onClick,
  type = "button",
  ...rest
}: {
  children: ReactNode;
  variant?: "fill" | "outline";
  disable?: boolean;
  buttonStyles?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full rounded-md ${variant === "fill" ? "bg-dark text-white" : "border-lightestGrey text-dark border bg-white"} border px-4 py-2 ${buttonStyles}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default VdButton;
