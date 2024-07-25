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
  const [timeUpdate, setTimeUpdate] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const seekHistory = useRef<number[]>([]);
  const redoSeekHistory = useRef<number[]>([]);

  const addSeekHistory = (time: number) => {
    seekHistory.current.push(time);
    redoSeekHistory.current = [];
  };

  const undo = () => {
    console.log("undo clicked");
    const lastTime = seekHistory.current.pop();
    if (lastTime !== undefined) {
      redoSeekHistory.current.push(lastTime);
      if (wavesurfer.current) {
        wavesurfer.current.seekTo(lastTime / wavesurfer.current.getDuration());
        setTimeUpdate(lastTime);
      }
    }
  };

  const redo = () => {
    console.log("redo clicked");
    const lastUndoTime = redoSeekHistory.current.pop();
    if (lastUndoTime !== undefined) {
      addSeekHistory(lastUndoTime);
      if (wavesurfer.current) {
        wavesurfer.current.seekTo(
          lastUndoTime / wavesurfer.current.getDuration(),
        );
      }
    }
  };

  useEffect(() => {
    if (videoRef.current && waveformRef.current) {
      setRefsReady(true);
    }
  }, [videoRef.current, waveformRef.current]);
  console.log(loading);
  useEffect(() => {
    if (refsReady) {
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

      wavesurfer.current.on("timeupdate", () => {
        const currentTime = wavesurfer.current?.getCurrentTime();
        setTimeUpdate(currentTime!);
      });

      wavesurfer.current.on("seeking", () => {
        addSeekHistory(wavesurfer.current?.getCurrentTime() ?? 0);
        console.log("seeking");
      });

      wavesurfer.current.on("ready", (duration) => {
        console.log("Ready", duration + "s");
      });

      wavesurfer.current.on("error", (error) => {
        console.error("WaveSurfer error:", error);
      });
      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [refsReady]);

  return { wavesurfer, timeUpdate, undo, redo, loading };
};

export default useWaveSurfer;
