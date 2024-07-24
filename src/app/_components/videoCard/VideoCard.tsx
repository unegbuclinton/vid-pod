import Image from "next/image";
import React from "react";

interface VideoCardProps {
  active?: boolean;
  src: string;
  checked?: boolean;
  checkable?: boolean;
  onCheckboxChange: (checked: boolean) => void | null;
  title: string;
  name: string;
}

const VideoCard = ({
  active,
  src,
  checked,
  checkable,
  title,
  name,
  onCheckboxChange,
}: VideoCardProps) => {
  return (
    <div
      className={`${active ? "border-[4px] border-highlightGreen" : "border-lightestGrey"} mb-4 flex w-[510px] items-center justify-between rounded-lg border p-3`}
    >
      <div className="flex items-center">
        <div className={`mr-4 h-[105px] w-[134px] rounded-lg`}>
          <video
            autoPlay
            loop
            className="h-full w-full rounded-lg object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
        <div>
          <h3 className="mb-2 text-base font-bold">{title}</h3>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-lighterGrey">
              13/03/24 • 3m 17s
            </p>
            -
            <Image
              alt="thumbnail"
              src={"/adProfileImg.png"}
              width={100}
              height={100}
              className="h-4 w-4 rounded-full object-cover"
            />
            <p className="text-sm font-semibold">{name}</p>
          </div>
        </div>
      </div>
      {checkable && (
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckboxChange(e.target.checked)}
          className="mr-4 cursor-pointer"
        />
      )}
    </div>
  );
};

export default VideoCard;
