import React from "react";
import VdIcon from "../vidIcons/VidIcons";

const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <VdIcon iconName="logoIcon" />
      <p className="text-2xl font-bold">Vidpod</p>
    </div>
  );
};

export default Logo;
