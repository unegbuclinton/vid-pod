"use client";
import React, { useEffect, useRef, useState } from "react";
import VdIcon from "../vidIcons/VidIcons";
import AdMarkerCard from "../adMarkerCard/AdMarkerCard";
import Video from "../video/Video";
import Waveform from "../waveform/Waveform";
import { api } from "@/trpc/react";
import useWaveSurfer from "@/app/libs/hooks/wavesurfer";

const VideoContent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [videoData, setVideoData] = useState<Episode[]>([]);

  const { data, error, isLoading } = api.episode.getEpisodes.useQuery();

  const { timeUpdate, redo, undo, loading } = useWaveSurfer({
    videoRef,
    waveformRef,
  });

  useEffect(() => {
    if (data) {
      setVideoData(data);
    }
    if (error) {
      console.error("Error fetching episodes:", error);
    }
  }, [data, error, isLoading]);

  const currentEpisode = videoData[videoData.length - 1];

  return (
    <article className="p-12">
      <span>
        <VdIcon iconName="adBackIcon" />
      </span>
      <div>
        <h3 className="my-4 max-w-[616px] text-[30px] font-bold">
          The Longevity Expert: The Truth About Ozempic, The Magic Weight Loss
          Drug & The Link Between Milk & Cancer!
        </h3>
        <p className="mb-8 font-semibold text-lighterGrey">
          Episode 503 • 12 April 2024
        </p>
        <div className="mb-8 flex gap-8">
          <AdMarkerCard data={currentEpisode!} setVideoData={setVideoData} />
          <div className="flex h-[552px] w-[668px] flex-col justify-between rounded-2xl border border-lightestGrey p-6">
            <Video videoRef={videoRef} data={currentEpisode!} />
          </div>
        </div>

        <Waveform
          loading={loading}
          duration={timeUpdate}
          waveformRef={waveformRef}
          handleRedo={redo}
          handleUndo={undo}
        />
      </div>
    </article>
  );
};

export default VideoContent;
