interface AdMarker {
  id: number;
  adMarkerType: string;
  episode?: Episode;
  episodeId: number | null;
}

interface Episode {
  id: number;
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
