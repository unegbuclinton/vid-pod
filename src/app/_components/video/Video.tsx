"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import VideoElement from "./videoElement/VideoElement";
import VideoControl from "./videoControls/VideoControl";

const Video = ({
  videoRef,
  data,
}: {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  data: Episode;
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
  const handleTogglePlayPause = async () => {
    if (videoRef.current) {
      try {
        if (videoRef.current.paused) {
          await videoRef.current.play();
          setPlaying(true);
        } else {
          videoRef.current.pause();
          setPlaying(false);
        }
      } catch (error) {
        console.error("Error handling video play/pause:", error);
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
        tooglePlayPause={handleTogglePlayPause}
        jumpToEnd={handleJumpToEnd}
        jumpToStart={handleJumpToStart}
        playing={playing}
      />
    </div>
  );
};

export default Video;
