import React, { RefObject } from "react";

interface videoProp {
  videoRef: RefObject<HTMLVideoElement>;
  data: Episode;
}
const VideoElement: React.FC<videoProp> = ({ videoRef, data }) => {
  if (data.url === undefined)
    <div
      className={`mb-4 h-[85%] w-full animate-pulse rounded-lg bg-dark/65`}
    ></div>;
  return (
    <div className={`mb-4 h-[85%] w-full rounded-lg`}>
      <video ref={videoRef} autoPlay className="rounded-lg">
        <source src={data.url} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoElement;
