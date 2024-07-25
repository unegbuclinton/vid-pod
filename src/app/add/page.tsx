"use client";

import React, { useState, FormEvent } from "react";
import VdButton from "../_components/button/VdButton";
import { api } from "@/trpc/react";
import toast from "react-hot-toast";

const AddForm = () => {
  const [url, setUrl] = useState("");
  const [company, setCompanuy] = useState("");
  const [ads, setAds] = useState("");
  const [name, setName] = useState("");
  // const createMarkerMutation = api.episode.createEpisode.useMutation({
  //   onError: (err: unknown) => {
  //     toast.error("Something went wrong!");

  //     if (err instanceof Error) {
  //       console.log(err.message);
  //     } else {
  //       console.log("An unknown error occurred.", err);
  //     }
  //   },
  //   onSuccess: async () => {
  //     toast.success("Created successfully!");
  //     setUrl("");
  //   },
  // });

  const createAds = api.ads.createAds.useMutation({
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
      setAds("");
      setName("");
      setCompanuy("");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // createMarkerMutation.mutate({ url: url });
    createAds.mutate({ company, name, url: ads });
  };

  return (
    <div>
      <p>Just add simple Episode to DB</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="Episode video"
          className="mb-2 mr-2 h-6 w-[500px] rounded-sm border border-lightestGrey py-2 outline-none"
        />
        <VdButton type="submit" buttonStyles="!w-fit">
          Add Episode
        </VdButton>
      </form>

      <p>Ads</p>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setCompanuy(e.target.value)}
          type="text"
          placeholder="Add COmpany"
          className="mb-2 mr-2 h-6 w-[500px] rounded-sm border border-lightestGrey py-2 outline-none"
        />
        <input
          onChange={(e) => setAds(e.target.value)}
          type="text"
          placeholder="Add ads"
          className="mb-2 mr-2 h-6 w-[500px] rounded-sm border border-lightestGrey py-2 outline-none"
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Add name"
          className="mb-2 mr-2 h-6 w-[500px] rounded-sm border border-lightestGrey py-2 outline-none"
        />
        <VdButton type="submit" buttonStyles="!w-fit">
          Add Episode
        </VdButton>
      </form>
    </div>
  );
};

export default AddForm;
