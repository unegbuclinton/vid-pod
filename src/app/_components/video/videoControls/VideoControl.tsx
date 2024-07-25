import React from "react";
import VdIcon from "../../vidIcons/VidIcons";

interface VideoControlProps {
  onRewind: () => void;
  onForward: () => void;
  tooglePlayPause: () => void;
  jumpToStart: () => void;
  jumpToEnd: () => void;
  playing: boolean;
}

const VideoControl: React.FC<VideoControlProps> = ({
  onRewind,
  onForward,
  tooglePlayPause,
  jumpToEnd,
  jumpToStart,
  playing,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-lightestGrey px-3 py-4 shadow-cardShadow">
      <p
        title="To Start"
        className="flex items-center gap-2 text-sm text-lighterGrey"
      >
        <span className="cursor-pointer" onClick={jumpToStart}>
          <VdIcon iconName="videoStartIcon" />
        </span>
        Jump to start
      </p>
      <div className="flex items-center gap-4">
        <p
          title="Rewind"
          className="flex items-center gap-2 text-sm text-lighterGrey"
        >
          <span className="cursor-pointer" onClick={onRewind}>
            <VdIcon iconName="reverseIcon" />
          </span>
          10s
        </p>
        <span title="Previous" className="cursor-pointer">
          <VdIcon iconName="nextIcon" />
        </span>
        <span
          title="Pause/Play"
          className="cursor-pointer"
          onClick={tooglePlayPause}
        >
          {!playing ? (
            <VdIcon iconName="playIcon" />
          ) : (
            <VdIcon iconName="pauseIcon" />
          )}
        </span>
        <span title="Next" className="cursor-pointer">
          <VdIcon iconName="prevIcon" />
        </span>
        <p
          title="Forward"
          className="flex items-center gap-2 text-sm text-lighterGrey"
        >
          10s
          <span className="cursor-pointer" onClick={onForward}>
            <VdIcon iconName="fastForwardIcon" />
          </span>
        </p>
      </div>
      <p
        title="To End"
        className="flex items-center gap-2 text-sm text-lighterGrey"
      >
        Jump to end
        <span className="cursor-pointer" onClick={jumpToEnd}>
          <VdIcon iconName="videoEndIcon" />
        </span>
      </p>
    </div>
  );
};

export default VideoControl;
