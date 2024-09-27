import "leaflet-geometryutil";

import { capitalizeFirstLetter } from "@utils/basic";
import type { FeatureCollection } from "geojson";
import * as L from "leaflet";
import * as React from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

interface Props {
  geojson: FeatureCollection;
  setGeojson: (geojson: FeatureCollection) => void;
  mode: "view" | "edit";
}

export default function EditControlFC({ geojson, setGeojson, mode }: Props) {
  const ref = React.useRef<L.FeatureGroup>(null);

  React.useEffect(() => {
    if (ref.current?.getLayers().length === 0 && geojson) {
      L.geoJSON(geojson, {
        onEachFeature: (feature, layer: any) => {
          if (feature.properties) {
            let popupContent = Object.entries(feature.properties)
              .map(([key, value]) => `<strong>${capitalizeFirstLetter(key)}:</strong> ${value}`)
              .join("<br>");

            // Add approximate area for Polygon features
            if (feature.geometry.type === "Polygon") {
              const areaInSquareMeters = (L.GeometryUtil as any).geodesicArea(
                layer.getLatLngs()[0]
              );
              popupContent += `<br><strong>Approximate Area:</strong> ${Math.round(
                areaInSquareMeters
              )} m²`;
            }

            layer.bindPopup(popupContent);
          }
          if (
            layer instanceof L.Polyline ||
            layer instanceof L.Polygon ||
            layer instanceof L.Marker
          ) {
            ref.current?.addLayer(layer);
          }
        },
      });
    }
  }, [geojson]);

  const handleChange = () => {
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === "FeatureCollection") {
      setGeojson(geo);
    }
  };

  return (
    <FeatureGroup ref={ref}>
      {mode === "edit" && (
        <EditControl
          position="topright"
          onEdited={handleChange}
          onCreated={handleChange}
          onDeleted={handleChange}
          draw={{
            rectangle: false,
            circle: false,
            polyline: false,
            polygon: true,
            marker: true,
            circlemarker: false,
          }}
        />
      )}
    </FeatureGroup>
  );
}
