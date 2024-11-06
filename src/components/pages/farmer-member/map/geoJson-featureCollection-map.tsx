import "react-leaflet-fullscreen/styles.css";
import "leaflet-draw/dist/leaflet.draw.css";

import L from "leaflet";
import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, useMap } from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";

import EditControlFC from "./EditControl";
import LayerControl from "./layerControl";

export default function GeoJsonFeatureCollectionMap({ geojson, setGeojson, mode }) {
  const mapRef = useRef(null);

  const result = useMemo(() => {
    if (geojson && geojson.features && geojson.features.length > 0) {
      const geoJsonLayer = L.geoJSON(geojson);
      const bounds = geoJsonLayer.getBounds();
      const center = bounds.getCenter();
      return {
        bounds,
        center,
      };
    }
  }, [geojson]);

  const bounds = result?.bounds;
  const center = result?.center;

  const mapStyle = {
    width: "100%",
    height: "100%",
  };

  function MapController() {
    const map = useMap();
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
        map.fitBounds(bounds as any, { padding: [50, 50] });
      }, 250);
    }, [map]);
    return null;
  }

  // TODO: in future versions, save the selection of map layer(OSM, GMAP, GMAP-Satellite etc) to localStorage for better UX.
  return (
    <MapContainer center={center} zoom={14} ref={mapRef} style={mapStyle}>
      <LayerControl />
      <EditControlFC geojson={geojson} setGeojson={setGeojson} mode={mode} />
      <FullscreenControl position="topleft" />
      <MapController />
    </MapContainer>
  );
}
