import React, { useState } from "react";
import VdIcon from "../vidIcons/VidIcons";

const Accordion = ({
  title,
  ads,
}: {
  title: string;
  ads: { name: string; url: string }[];
}) => {
  const [toggleShow, setToggleShow] = useState(true);
  return (
    <div className="">
      <p
        onClick={() => setToggleShow((prev) => !prev)}
        className="flex cursor-pointer items-center justify-between pb-2 text-sm font-semibold hover:shadow-buttonShadow"
      >
        {title}
        <span>
          {!toggleShow ? (
            <VdIcon iconName="arrowDownIcon" />
          ) : (
            <VdIcon iconName="arrowUpIcon" />
          )}
        </span>{" "}
      </p>
      <ul
        className={`${!toggleShow ? "side-line h-fit" : "h-0"} transition-height relative overflow-hidden px-3 py-3 duration-500 ease-custom-bezier`}
      >
        {ads.map(({ name }, idx) => (
          <li key={idx} className="list-none py-3 text-sm font-semibold">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accordion;
