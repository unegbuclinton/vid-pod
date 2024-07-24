import React, { useState } from "react";

const VdSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <label
      className="relative mb-4 flex cursor-pointer items-center"
      onClick={toggleSwitch}
    >
      <input
        type="checkbox"
        id="toggle-example"
        className="sr-only"
        checked={isOn}
        readOnly
      />
      <div
        className={`toggle-bg h-6 w-11 rounded-full border-2 ${isOn ? "border-blue-500 bg-blue-500" : "border-gray-200 bg-gray-200"}`}
      >
        <div
          className={`dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition ${isOn ? "translate-x-full transform" : ""}`}
        ></div>
      </div>
    </label>
  );
};

export default VdSwitch;
