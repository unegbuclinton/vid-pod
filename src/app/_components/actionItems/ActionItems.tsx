import React from "react";
import VdIcon from "../vidIcons/VidIcons";
import VdSwitch from "../vdswitch/VdSwitch";

interface actionItemsProp {
  title: string;
  icon: string;
  actionBtn?: boolean;
}
const ActionItems = () => {
  const actionData: actionItemsProp[] = [
    {
      title: "Demo mode",
      icon: "demoIcon",
      actionBtn: true,
    },
    {
      title: "Invite your team",
      icon: "inviteIcon",
    },
    {
      title: "Give feedback",
      icon: "feedbackIcon",
    },
    {
      title: "Help & support",
      icon: "helpIcon",
    },
  ];
  return (
    <ul className="px-3">
      {actionData.map(({ icon, title, actionBtn }, idx) => (
        <li
          key={idx}
          className={`mb-4 flex cursor-pointer items-center gap-4 text-sm font-bold text-lighterGrey`}
        >
          <span>
            <VdIcon iconName={icon} />
          </span>
          {title}
          {/* <span>{actionBtn && <VdSwitch />}</span> */}
        </li>
      ))}
    </ul>
  );
};

export default ActionItems;
