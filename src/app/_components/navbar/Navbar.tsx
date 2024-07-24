import Image from "next/image";
import React from "react";
import VdIcon from "../vidIcons/VidIcons";
import Profile from "../profile/Profile";
import Logo from "../logo/Logo";

const Navbar = () => {
  return (
    <nav className="bg-bgPrimary border-lightestGrey flex items-center justify-between border-b px-8 py-6">
      <Logo />
      <div className="flex items-center gap-8">
        <span title="settings" className="cursor-pointer">
          <VdIcon iconName="settingsIcon" />
        </span>
        <span title="notification" className="cursor-pointer">
          <VdIcon iconName="notificationIcon" />
        </span>

        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
