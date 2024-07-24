"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import VideoElement from "./videoElement/VideoElement";
import VideoControl from "./videoControls/VideoControl";

const Video = ({
  videoRef,
  onPrevious,
  onNext,
  data,
}: {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  data: Episode;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };
  const handleTogglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlaying(true);
      } else {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  };
  const handleJumpToStart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleJumpToEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration;
    }
  };

  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
      }
    };
    const videoElement = videoRef.current;
    videoElement?.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoElement?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <div>
      <VideoElement videoRef={videoRef} data={data} />
      <VideoControl
        onForward={handleForward}
        onRewind={handleRewind}
        onNext={onNext}
        onPrevious={onPrevious}
        tooglePlayPause={handleTogglePlayPause}
        jumpToEnd={handleJumpToEnd}
        jumpToStart={handleJumpToStart}
        playing={playing}
      />
    </div>
  );
};

export default Video;
