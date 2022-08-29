import { Box } from "@chakra-ui/react";
import useDocumentFilter from "@components/pages/document/common/use-document-filter";
import SITE_CONFIG from "@configs/site-config";
import { getMapCenter, stringToFeature } from "@utils/location";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const FILTER_NAME = "location";

const NakshaMapboxDraw: any = dynamic(
  () => import("naksha-components-react").then((mod: any) => mod.NakshaMapboxDraw),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function MapDrawContainer() {
  const { filter, addFilter, removeFilter } = useDocumentFilter();
  const defaultFeatures = useMemo(() => stringToFeature(filter?.location), []);
  const defaultViewState = useMemo(() => getMapCenter(2.8), []);

  const handleOnFeatureChange = (features) => {
    if (features.length > 0) {
      addFilter(FILTER_NAME, features[0]?.geometry?.coordinates.toString());
      addFilter("geoShapeFilterField", "documentCoverages.topology");
      return;
    }
    removeFilter(FILTER_NAME);
    removeFilter("geoShapeFilterField");
  };

  return (
    <Box position="relative" h="22rem">
      <NakshaMapboxDraw
        defaultViewState={defaultViewState}
        features={defaultFeatures}
        mapboxAccessToken={SITE_CONFIG.TOKENS.MAPBOX}
        onFeaturesChange={handleOnFeatureChange}
        isPolygon={true}
      />
    </Box>
  );
}
