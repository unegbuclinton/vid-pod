import React, { useEffect, useState } from "react";
import VdIcon from "../vidIcons/VidIcons";
import { formatDuration } from "@/app/libs/jsondata/helperFunctions";
import Slider from "../slider/Slider";

const Waveform = ({
  duration,
  waveformRef,
  handleUndo,
  handleRedo,
  loading,
}: {
  duration: number;
  waveformRef: React.MutableRefObject<HTMLDivElement | null>;
  handleRedo: () => void;
  loading: boolean;
  handleUndo: () => void;
}) => {
  const [show, setShow] = useState(false);
  // if (loading) return <div>No form data yet ... </div>;

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3500);
  }, []);

  return (
    <div className="w-full rounded-lg border border-lightestGrey p-6 shadow-buttonShadow">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div
            title="Undo"
            onClick={handleUndo}
            className="flex items-center gap-2"
          >
            <span className="cursor-pointer">
              <VdIcon iconName="undoIcon" />
            </span>
            <p className="text-sm text-lighterGrey">Undo</p>
          </div>
          <div
            title="Redo"
            onClick={handleRedo}
            className="flex items-center gap-2"
          >
            <span className="cursor-pointer">
              <VdIcon iconName="redoIcon" />
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
      {loading && (
        <div className="mb-2 animate-pulse text-xs">
          Please wait, wave form is loading......
        </div>
      )}

      <div
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
