import { api } from "@/trpc/react";
import { useState } from "react";
import toast from "react-hot-toast";

type CreateMarkerInput = {
  adMarkerType: "Auto" | "Static" | "A/B";
  episodeId: number;
};

type UpdateMarkerInput = {
  adMarkerType: "Auto" | "Static" | "A/B";
  episodeId: number;
  id: number;
};

type UseMarkerReturnType = {
  createMarker: (data: CreateMarkerInput) => void;
  updateMarker: (data: UpdateMarkerInput) => void;
  updatedData: Episode[];
};

export const useMarker = (): UseMarkerReturnType => {
  const [updatedData, setUpdatedData] = useState<Episode[]>([]);

  const { refetch } = api.episode.getEpisodes.useQuery();

  const createMarkerMutation = api.admarker.createNewMarker.useMutation({
    onError: (err: unknown) => {
      toast.error("Something went wrong!");

      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred.", err);
      }
    },
    onSuccess: async () => {
      toast.success("Created successfully!");

      try {
        const updatedData = await refetch();
        if (updatedData) {
          setUpdatedData(updatedData.data!);
        }
      } catch (err: unknown) {
        toast.error("Failed to fetch episodes");

        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log(
            "An unknown error occurred while fetching episodes.",
            err,
          );
        }
      }
    },
  });

  const updateMarkerMutation = api.admarker.updateMarker.useMutation({
    onError: (err: unknown) => {
      toast.error("Something went wrong!");

      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred.", err);
      }
    },
    onSuccess: async () => {
      toast.success("Updated successfully!");

      try {
        const updatedData = await refetch();
        if (updatedData) {
          setUpdatedData(updatedData.data!);
        }
      } catch (err: unknown) {
        toast.error("Failed to fetch episodes");

        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.log(
            "An unknown error occurred while fetching episodes.",
            err,
          );
        }
      }
    },
  });

  const createMarker = (data: CreateMarkerInput) => {
    createMarkerMutation.mutate(data);
  };

  const updateMarker = (data: UpdateMarkerInput) => {
    updateMarkerMutation.mutate(data);
  };

  return { createMarker, updateMarker, updatedData };
};
