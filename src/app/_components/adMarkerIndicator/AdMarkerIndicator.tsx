import React, { useState } from "react";
import VdIcon from "../vidIcons/VidIcons";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";
import VdModal from "../VdModal/VdModal";
import EditAdMarker from "../editAdMarker/EditAdMarker";
import AbTest from "../abTests/AbTest";
import AbTestResult from "../abTests/AbTestResult";
import { useRouter } from "next/navigation";
import { addParamToUrl } from "@/app/libs/hooks/extractUrl";

const AdMarkerIndicator = ({
  adType,
  index,
  episodeId,
  setVideoData,
  id,
}: {
  adType: AdMarker | any;
  index: number;
  episodeId: number | null;
  id: number;
  setVideoData: React.Dispatch<React.SetStateAction<Episode[]>>;
}) => {
  const [editSelection, setEditSelection] = useState<boolean>(false);
  const [abMarkerSelection, setAbMarkerSelection] = useState<boolean>(false);
  const [adRestlt, setAdResult] = useState<Ad[]>([]);
  const [abMarkerModal, setAbMarkerModal] = useState<boolean>(false);

  const url = window.location.href;
  const router = useRouter();

  const { refetch } = api.episode.getEpisodes.useQuery();

  const deleteMarker = api.admarker.deleteMarker.useMutation({
    onError: (err) => {
      toast.error("Something went wrong!");
      console.log(err.message);
    },
    onSuccess: async () => {
      toast.error("Deleted successfully!");

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

  return (
    <div className="mb-4 flex items-center gap-4">
      <p>{index}</p>
      <div className="filter-drop-shadow flex items-center gap-4 rounded-lg border border-lightestGrey p-3">
        <span>00:00:04</span>
        <span>
          <VdIcon iconName={adType} />
        </span>
        <button
          onClick={() => {
            const newUrl = addParamToUrl(url, "edit", `${id}`);
            router.push(newUrl);
            setEditSelection(true);
          }}
          className="rounded-md border border-lightestGrey px-3 py-2"
        >
          Edit
        </button>
        <span
          onClick={() => deleteMarker.mutate({ id })}
          className="cursor-pointer"
        >
          <VdIcon iconName="deleteIcon" />
        </span>
      </div>
      <VdModal isShown={editSelection} hide={() => setEditSelection(false)}>
        <EditAdMarker
          setAbMarkerSelection={setAbMarkerSelection}
          id={id}
          episodeDataId={episodeId}
          setVideoData={setVideoData}
          onClose={() => setEditSelection(false)}
        />
      </VdModal>
      <VdModal
        isShown={abMarkerSelection}
        hide={() => setAbMarkerSelection(false)}
      >
        <AbTest
          setAdResult={setAdResult}
          onClose={() => setAbMarkerSelection(false)}
          setAbMarkerModal={setAbMarkerModal}
        />
      </VdModal>
      <VdModal isShown={abMarkerModal} hide={() => setAbMarkerModal(false)}>
        <AbTestResult
          episodeId={episodeId!}
          adResults={adRestlt}
          setVideoData={setVideoData}
          onClose={() => setAbMarkerModal(false)}
        />
      </VdModal>
    </div>
  );
};

export default AdMarkerIndicator;
