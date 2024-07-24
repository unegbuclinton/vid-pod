import React from "react";
import VdIcon from "../vidIcons/VidIcons";
import { formatDuration } from "@/app/libs/jsondata/helperFunctions";
import Slider from "../slider/Slider";

const Waveform = ({
  duration,
  waveformRef,
}: {
  duration: number;
  waveformRef: React.MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="w-full rounded-lg border border-lightestGrey p-6 shadow-buttonShadow">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="cursor-pointer">
              <VdIcon iconName="undoIcon" />
            </span>
            <p className="text-sm text-lighterGrey">Undo</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="cursor-pointer">
              <VdIcon iconName="undoIcon" />
            </span>
            <p className="text-sm text-lighterGrey">Redo</p>
          </div>
        </div>
        <p className="w-fit rounded-md border border-lightestGrey px-3 py-2">
          {formatDuration(duration)}
        </p>
        <div className="flex max-w-[200px] items-center gap-6">
          <span>
            <VdIcon iconName="zoomInIcon" />
          </span>
          <Slider onChange={(e) => null} />
          <span>
            <VdIcon iconName="zoomOutIcon" />
          </span>
        </div>
      </div>
      <div
        id="waveform"
        ref={waveformRef}
        style={{
          width: "100%",
          height: "139px",
          background: "#F0ABFC",
          borderRadius: "8px",
          border: "6px solid black",
        }}
      />
    </div>
  );
};

export default Waveform;
