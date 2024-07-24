// src/hooks/useWaveSurfer.ts
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";

interface UseWaveSurferProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  waveformRef: React.RefObject<HTMLDivElement>;
}

const useWaveSurfer = ({ videoRef, waveformRef }: UseWaveSurferProps) => {
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [refsReady, setRefsReady] = useState(false);

  useEffect(() => {
    if (videoRef.current && waveformRef.current) {
      setRefsReady(true);
    }
  }, [videoRef.current, waveformRef.current]);

  useEffect(() => {
    if (refsReady) {
      console.log("I am trying to create");
      const regions = RegionsPlugin.create();

      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current as HTMLElement,
        waveColor: "#fff",
        progressColor: "#fff",
        media: videoRef.current as HTMLMediaElement,
        dragToSeek: true,
        cursorColor: "#EF4444",
        backend: "MediaElement",
        cursorWidth: 3,
        fillParent: true,
        barWidth: 2,
        barGap: 6,
        plugins: [regions],
      });

      regions.addRegion({
        start: 9,
        end: 10,
        content: "",
        color: "#fff",
        minLength: 1,
        maxLength: 10,
        channelIdx: 2,
      });

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [refsReady]);

  return { wavesurfer };
};

export default useWaveSurfer;
