interface AdMarker {
  id: string;
  adMarkerType: string;
  episode?: Episode;
  episodeId: string | null;
}

interface Episode {
  id: string;
  url: string;
  adMarkers?: AdMarker[];
  createdAt: Date;
  updatedAt: Date;
}

interface Ad {
  name: string;
  url: string;
  company: string;
}
