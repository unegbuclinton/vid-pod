import React from "react";
import VdIcon from "../vidIcons/VidIcons";
import VdButton from "../button/VdButton";
import VideoCard from "../videoCard/VideoCard";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const AbTestResult = ({
  onClose,
  adResults,
  setVideoData,
  episodeId,
}: {
  onClose: () => void;
  adResults: Ad[];
  episodeId: number;
  setVideoData: React.Dispatch<React.SetStateAction<Episode[]>>;
}) => {
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");

  const count = adResults.length;
  const randomIndex = Math.floor(Math.random() * adResults.length);
  const { refetch } = api.episode.getEpisodes.useQuery();
  const createMarker = api.admarker.createNewMarker.useMutation({
    onError: (err) => {
      toast.error("Something went wrong!");
      console.log(err.message);
    },
    onSuccess: async () => {
      toast.success("Created successfully!");

      try {
        const updatedData = await refetch();
        if (updatedData) {
          setVideoData(updatedData.data!);
        }
      } catch (err: any) {
        toast.error("Failed to fetch episodes");
        console.error(err.message);
      } finally {
        onClose();
      }
    },
  });

  const updateMarker = api.admarker.updateMarker.useMutation({
    onError: (err) => {
      toast.error("Something went wrong!");
      console.log(err.message);
    },
    onSuccess: async () => {
      toast.success("Updated successfully!");

      try {
        const updatedData = await refetch();
        if (updatedData) {
          setVideoData(updatedData.data!);
        }
      } catch (err: any) {
        toast.error("Failed to fetch episodes");
        console.error(err.message);
      } finally {
        onClose();
      }
    },
  });
  return (
    <div className="relative rounded-lg bg-white p-8">
      <span className="absolute right-4 top-4 cursor-pointer" onClick={onClose}>
        <VdIcon iconName="cancelIcon" />
      </span>

      <h3 className="mb-2 text-base font-bold">A/B test results</h3>
      <p className="mb-6 text-sm text-lighterGrey">{count} ads tested</p>

      {adResults.map((ad, index) => (
        <VideoCard
          active={index === randomIndex}
          onCheckboxChange={() => null}
          key={index}
          src={ad.url}
          name={ad.name}
          title={ad.company}
        />
      ))}

      <div className="flex justify-end gap-4">
        <VdButton
          buttonStyles="!w-fit !shadow-buttonShadow"
          variant="outline"
          onClick={onClose}
        >
          <p className="text-semibold">New Test</p>
        </VdButton>
        <VdButton
          onClick={() => {
            !editParam
              ? createMarker.mutate({
                  adMarkerType: "A/B",
                  episodeId: episodeId,
                })
              : updateMarker.mutate({
                  adMarkerType: "A/B",
                  episodeId: episodeId,
                  id: Number(editParam),
                });
          }}
          buttonStyles="!w-fit "
        >
          <p className="text-semibold text-nowrap">Done</p>
        </VdButton>
      </div>
    </div>
  );
};

export default AbTestResult;
