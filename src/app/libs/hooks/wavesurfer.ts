// src/hooks/useWaveSurfer.ts
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";

interface UseWaveSurferProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  waveformRef: React.RefObject<HTMLDivElement>;
}

const useWaveSurfer = ({ videoRef, waveformRef }: UseWaveSurferProps) => {
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (videoRef.current && waveformRef.current) {
      const regions = RegionsPlugin.create();

      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#fff",
        progressColor: "#fff",
        media: videoRef.current,
        dragToSeek: true,
        cursorColor: "#EF4444",
        backend: "MediaElement",
        cursorWidth: 3,
        fillParent: true,
        barWidth: 2,
        barGap: 6,
        plugins: [regions],
      });

      // Example region setup
      regions.addRegion({
        start: 9,
        end: 10,
        content: "",
        color: "#fff",
        minLength: 1,
        maxLength: 10,
        channelIdx: 2,
      });

      // Clean up function
      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [videoRef, waveformRef]);

  return { wavesurfer };
};

export default useWaveSurfer;
