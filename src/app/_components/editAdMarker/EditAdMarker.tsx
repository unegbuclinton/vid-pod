import React, { useState } from "react";
import VdIcon from "../vidIcons/VidIcons";
import VdButton from "../button/VdButton";
import { adMarkers } from "@/app/libs/jsondata/admarker";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

const EditAdMarker = ({
  onClose,
  setAbMarkerSelection,
  episodeDataId,
  id,
  setVideoData,
}: {
  onClose: () => void;
  episodeDataId: number | null;
  setAbMarkerSelection: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  setVideoData: React.Dispatch<React.SetStateAction<Episode[]>>;
}) => {
  const [activeMArker, setActiveMarker] = useState<string>("Auto");

  const { refetch } = api.episode.getEpisodes.useQuery();

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
      }
    },
  });

  const handleSelectMarker = () => {
    if (activeMArker === "Auto" || activeMArker === "Static") {
      updateMarker.mutate({
        adMarkerType: activeMArker,
        episodeId: episodeDataId!,
        id: id,
      });
    } else {
      setAbMarkerSelection(true);
    }
    onClose();
  };

  return (
    <div className="relative rounded-lg bg-white p-8">
      <span className="absolute right-4 top-4 cursor-pointer" onClick={onClose}>
        <VdIcon iconName="cancelIcon" />
      </span>

      <h3 className="mb-2 text-base font-bold">Edit ad marker</h3>
      <p className="mb-6 text-sm text-lighterGrey">
        Insert a new ad marker into this episode
      </p>

      {adMarkers.map(({ icon, subtitle, title }, idx) => (
        <div
          key={idx}
          onClick={() => setActiveMarker(title)}
          className="mb-4 flex w-[390px] cursor-pointer items-center justify-between rounded-lg border border-lightestGrey p-4"
        >
          <div className="flex items-center gap-4">
            <span>
              <VdIcon iconName={icon} />
            </span>
            <div>
              <p className="mb-1 text-base font-bold">{title}</p>
              <p className="text-sm font-semibold text-lighterGrey">
                {subtitle}
              </p>
            </div>
          </div>

          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-dark">
            {title === activeMArker && (
              <span className="block h-2 w-2 rounded-full bg-dark"></span>
            )}
          </span>
        </div>
      ))}
      <div className="flex justify-end gap-4">
        <VdButton
          buttonStyles="w-fit !shadow-buttonShadow"
          variant="outline"
          onClick={onClose}
        >
          <p className="text-semibold">Cancel</p>
        </VdButton>
        <VdButton onClick={handleSelectMarker} buttonStyles="w-fit">
          <p className="text-semibold text-nowrap">Update marker</p>
        </VdButton>
      </div>
    </div>
  );
};

export default EditAdMarker;
