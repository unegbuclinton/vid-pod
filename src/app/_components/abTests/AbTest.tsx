import React, { useState, useEffect } from "react";
import VdButton from "../button/VdButton";
import VdIcon from "../vidIcons/VidIcons";
import VideoCard from "../videoCard/VideoCard";
import Accordion from "../accordion/Accordion";
import { api } from "@/trpc/react";

const AbTest = ({
  onClose,
  setAbMarkerModal,
  setAdResult,
}: {
  onClose: () => void;
  setAbMarkerModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAdResult: React.Dispatch<React.SetStateAction<Ad[]>>;
}) => {
  const handleCreateAB = () => {
    setAbMarkerModal(true);
    onClose();
  };

  const [selectedItems, setSelectedItems] = useState<Ad[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  const handleCheckboxChange = (ad: Ad, isChecked: boolean) => {
    setSelectedItems((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, ad];
      } else {
        return prevSelected.filter((selectedAd) => selectedAd.url !== ad.url);
      }
    });
    setAdResult(selectedItems);
  };

  const { data } = api.ads.getAllAds.useQuery();

  useEffect(() => {
    if (data) {
      const adsArray = Object.entries(data).flatMap(([company, ads]) => {
        return ads.map((ad) => ({
          company,
          ...ad,
        }));
      });
      setAds(adsArray);
    }
  }, [data]);

  useEffect(() => {
    setAdResult(selectedItems);
  }, [selectedItems]);

  return (
    <div className="relative h-[650px] rounded-lg bg-white p-8">
      <span className="absolute right-4 top-4 cursor-pointer" onClick={onClose}>
        <VdIcon iconName="cancelIcon" />
      </span>

      <h3 className="mb-2 text-base font-bold">A/B test results</h3>
      <p className="mb-6 border-b border-lightestGrey pb-4 text-sm text-lighterGrey">
        Select which ads you like to A/B test
      </p>

      <div className="flex gap-3">
        <div className="hidden-scroll h-[450px] w-[200px] overflow-y-scroll rounded-lg bg-grey p-3 pb-5">
          <div className="relative h-11 w-[175px]">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <VdIcon iconName="searchIcon" />
            </span>
            <input
              type="text"
              className="h-full w-full rounded-md border border-lightestGrey pl-7 text-sm outline-none"
              placeholder="Search library"
            />
          </div>
          <p className="flex gap-2 py-4 text-base font-bold">
            <span>
              <VdIcon iconName="libraryIcon" />
            </span>
            Ad library
          </p>
          <p className="my-4 text-sm font-semibold text-text-dark">
            All folders
          </p>

          {data &&
            Object.entries(data).map(([company, ads], idx) => (
              <Accordion ads={ads} title={company} key={idx} />
            ))}
        </div>
        <div className="hidden-scroll h-[450px] overflow-y-scroll pb-5">
          <div className="mb-3 flex justify-end gap-3">
            <div className="flex h-11 w-fit items-center gap-1 rounded-md border border-lightestGrey px-3 py-2">
              <span>
                <VdIcon iconName="updownIcon" />
              </span>
              <p className="text-sm font-semibold text-lighterGrey">
                Upload date
              </p>
            </div>
            <div className="relative h-11 w-[175px]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <VdIcon iconName="searchIcon" />
              </span>
              <input
                type="text"
                className="h-full w-full rounded-md border border-lightestGrey pl-7 text-sm outline-none"
                placeholder="Search ads"
              />
            </div>
          </div>

          {ads.map((ad, index) => (
            <VideoCard
              key={index}
              src={ad.url}
              name={ad.name}
              title={ad.company}
              checkable
              checked={selectedItems.some(
                (selectedAd) => selectedAd.url === ad.url,
              )}
              onCheckboxChange={(checked) => handleCheckboxChange(ad, checked)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 flex w-[92%] justify-between gap-4 bg-white">
        <VdButton
          buttonStyles="!w-fit !shadow-buttonShadow"
          variant="outline"
          onClick={onClose}
        >
          <p className="text-semibold">Cancel</p>
        </VdButton>
        <div className="flex items-center gap-4">
          {!!selectedItems.length && (
            <p className="text-sm font-semibold">{`${selectedItems.length} ${selectedItems.length > 1 ? "ads" : "ad"} selected`}</p>
          )}
          <VdButton buttonStyles="!w-fit " onClick={handleCreateAB}>
            <p className="text-semibold text-nowrap">Create A/B test</p>
          </VdButton>
        </div>
      </div>
    </div>
  );
};

export default AbTest;
