import { api } from "@/trpc/react";
import { useState } from "react";
import toast from "react-hot-toast";

type UseMarkerReturnType = {
  createMarker: (data: any) => void;
  updateMarker: (data: any) => void;
  updatedData: any;
};

export const useMarker = (): UseMarkerReturnType => {
  const [updatedData, setUpdatedData] = useState<any>(null);

  const { refetch } = api.episode.getEpisodes.useQuery();

  const createMarkerMutation = api.admarker.createNewMarker.useMutation({
    onError: (err: any) => {
      toast.error("Something went wrong!");
      console.log(err.message);
    },
    onSuccess: async () => {
      toast.success("Created successfully!");

      try {
        const updatedData = await refetch();
        if (updatedData) {
          setUpdatedData(updatedData.data!);
        }
      } catch (err: any) {
        toast.error("Failed to fetch episodes");
        console.error(err.message);
      }
    },
  });

  const updateMarkerMutation = api.admarker.updateMarker.useMutation({
    onError: (err: any) => {
      toast.error("Something went wrong!");
      console.log(err.message);
    },
    onSuccess: async () => {
      toast.success("Updated successfully!");

      try {
        const updatedData = await refetch();
        if (updatedData) {
          setUpdatedData(updatedData.data!);
        }
      } catch (err: any) {
        toast.error("Failed to fetch episodes");
        console.error(err.message);
      }
    },
  });

  const createMarker = (data: any) => {
    createMarkerMutation.mutate(data);
  };

  const updateMarker = (data: any) => {
    updateMarkerMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Updated successfully!");
      },
    });
  };

  return { createMarker, updateMarker, updatedData };
};
