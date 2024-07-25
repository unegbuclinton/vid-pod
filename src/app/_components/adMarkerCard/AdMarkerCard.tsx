"use client";
import React, { Suspense, useState } from "react";
import AdMarkerIndicator from "../adMarkerIndicator/AdMarkerIndicator";
import VdButton from "../button/VdButton";
import VdIcon from "../vidIcons/VidIcons";
import VdModal from "../VdModal/VdModal";
import CreateAdMarker from "../createAdMarker/CreateAdMarker";
import AbTest from "../abTests/AbTest";

const AdMarkerCard = ({
  data,
  setVideoData,
}: {
  data: Episode;
  setVideoData: React.Dispatch<React.SetStateAction<Episode[]>>;
}) => {
  const [createMarkerModal, setCreateMarkerModal] = useState<boolean>(false);
  const [abMarkerModal, setAbMarkerModal] = useState<boolean>(false);
  const [abMarkerSelection, setAbMarkerSelection] = useState<boolean>(false);
  const [adRestlt, setAdResult] = useState<Ad[]>([]);

  const AbTestResult = React.lazy(() => import("../abTests/AbTestResult"));
  return (
    <div className="flex w-[370px] flex-col justify-between rounded-2xl border border-lightestGrey p-6">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-base font-bold">Ad markers</p>
          <p className="text-base font-semibold text-lighterGrey">
            {`${data.adMarkers?.length ?? 0} ${data.adMarkers?.length && data.adMarkers.length > 1 ? "markers" : "marker"}`}
          </p>
        </div>

        <>
          {!data.adMarkers || data.adMarkers.length === 0 ? (
            <div>No Ad marker available</div>
          ) : (
            data.adMarkers.map(({ adMarkerType, id, episodeId }, index) => (
              <AdMarkerIndicator
                setVideoData={setVideoData}
                id={id}
                episodeId={episodeId}
                key={index}
                adType={
                  adMarkerType === "A/B" ? "adABIcon" : `ad${adMarkerType}Icon`
                }
                index={index + 1}
              />
            ))
          )}
        </>
      </div>

      <div className="mt-[124px] justify-self-end">
        <VdButton
          onClick={() => setCreateMarkerModal(true)}
          buttonStyles="mb-4"
          type="button"
        >
          <div className="flex items-center justify-center gap-2">
            <p>Create ad marker</p>
            <span>
              <VdIcon iconName="addIcon" />
            </span>
          </div>
        </VdButton>
        <VdButton variant="outline">
          <div className="flex items-center justify-center gap-2">
            <p>Automatically place</p>{" "}
            <span>
              <VdIcon iconName="wandIcon" />
            </span>
          </div>
        </VdButton>
      </div>

      {/* modals */}
      <VdModal
        isShown={createMarkerModal}
        hide={() => setCreateMarkerModal(false)}
      >
        <CreateAdMarker
          episodeData={data}
          setVideoData={setVideoData}
          onClose={() => setCreateMarkerModal(false)}
          setAbMarkerSelection={setAbMarkerSelection}
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
        <Suspense fallback={<div>Loading...</div>}>
          <AbTestResult
            episodeId={data.id}
            adResults={adRestlt}
            setVideoData={setVideoData}
            onClose={() => setAbMarkerModal(false)}
          />
        </Suspense>
      </VdModal>
    </div>
  );
};

export default AdMarkerCard;
