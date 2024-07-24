"use client";
import React, { useState } from "react";
import { api } from "@/trpc/react";

const Videoform = () => {
  const [url, setUrl] = useState("");
  const [company, setComapany] = useState("");
  const [name, setName] = useState("");

  const createPost = api.episode.createEpisode.useMutation({
    onError: (err) => {
      console.log(err.message);
    },
    onSuccess: async () => {
      console.log("Created sucessfully!");
      setUrl("");
    },
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    createPost.mutate({ url });
  };

  const createAds = api.ads.createAds.useMutation({
    onError: (err) => {
      console.log(err.message);
    },
    onSuccess: async () => {
      console.log("Created sucessfully!");
      setUrl("");
    },
  });

  const handleadsSubmit = (e: any) => {
    e.preventDefault();
    createAds.mutate({ url, company: company, name: name });
  };

  return (
    <div>
      <h1 className="mb-5">
        this is just behind the scene code to populate the db
      </h1>
      <p>Add Episode </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          className="border border-black"
        />
        <button>Submit</button>
      </form>
      ads form
      <form onSubmit={handleadsSubmit}>
        <input
          type="text"
          placeholder="Url"
          onChange={(e) => setUrl(e.target.value)}
          className="border border-black"
        />
        <input
          type="text"
          onChange={(e) => setComapany(e.target.value)}
          placeholder="company"
          className="border border-black"
        />
        <input
          type="text"
          placeholder="advertName"
          onChange={(e) => setName(e.target.value)}
          className="border border-black"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Videoform;
