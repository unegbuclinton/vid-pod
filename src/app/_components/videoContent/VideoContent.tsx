"use client";
import React, { useEffect, useRef, useState } from "react";
import VdIcon from "../vidIcons/VidIcons";
import AdMarkerCard from "../adMarkerCard/AdMarkerCard";
import Video from "../video/Video";
import Waveform from "../waveform/Waveform";
import { api } from "@/trpc/react";
import useWaveSurfer from "@/app/libs/hooks/wavesurfer";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";

const VideoContent: React.FC = () => {
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const [videoData, setVideoData] = useState<Episode[]>([]);

  const [currentEpisodeIndex, setCurrentIndexEpisode] = useState(0);

  const { data, error, isLoading } = api.episode.getEpisodes.useQuery();

  useWaveSurfer({ videoRef, waveformRef });

  // const videoRef = useRef<HTMLVideoElement | null>(null);
  // const waveformRef = useRef<HTMLDivElement | null>(null);
  // const wavesurfer = useRef<WaveSurfer | null>(null);
  // const [refsReady, setRefsReady] = useState(false);

  useEffect(() => {
    if (data) {
      setVideoData(data);
    }
    if (error) {
      console.error("Error fetching episodes:", error);
    }
  }, [data, error, isLoading]);

  if (isLoading) return <div>Loading.....</div>;

  const currentEpisode = videoData[currentEpisodeIndex];

  const handleNextEpisode = () => {
    if (currentEpisodeIndex < videoData.length) {
      setCurrentIndexEpisode((prev) => prev++);
    } else {
      return;
    }
  };

  const handlePreviousEpisode = () => {
    if (currentEpisodeIndex === 0) {
      return;
    } else {
      setCurrentIndexEpisode((prev) => prev--);
    }
  };

  if (!currentEpisode) return <div>No episode at the moment.....</div>;

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
            <Video
              setDuration={setDuration}
              onNext={handleNextEpisode}
              onPrevious={handlePreviousEpisode}
              videoRef={videoRef}
              data={currentEpisode}
            />
          </div>
        </div>

        <Waveform duration={duration} waveformRef={waveformRef} />
      </div>
    </article>
  );
};

export default VideoContent;
