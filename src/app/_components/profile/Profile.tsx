import Image from "next/image";
import React from "react";
import VdIcon from "../vidIcons/VidIcons";

const Profile = () => {
  return (
    <div className="border-lightestGrey shadow-cardShadow flex max-w-[206px] cursor-pointer items-center justify-around gap-2 rounded-lg border px-4 py-3">
      <Image
        alt="profile-image"
        src={"/profile.png"}
        width={32}
        height={32}
        className="object-cover"
      />
      <p className="text-base font-bold">Emma Warren</p>
      <VdIcon iconName="arrowDownIcon" />
    </div>
  );
};

export default Profile;
