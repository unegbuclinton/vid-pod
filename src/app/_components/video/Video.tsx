"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import VideoElement from "./videoElement/VideoElement";
import VideoControl from "./videoControls/VideoControl";

const Video = ({
  setDuration,
  videoRef,
  onPrevious,
  onNext,
  data,
}: {
  setDuration: Dispatch<SetStateAction<number>>;
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
    setDuration(videoRef.current?.duration ?? 0);
  }, [videoRef.current]);

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
