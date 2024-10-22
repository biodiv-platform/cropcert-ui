import "react-leaflet-fullscreen/styles.css";
import "leaflet-draw/dist/leaflet.draw.css";

import { MAP_LAYERS } from "@static/constants";
import L from "leaflet";
import React, { useEffect, useMemo, useRef } from "react";
import { LayerGroup, LayersControl, MapContainer, TileLayer, useMap } from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";

import EditControlFC from "./EditControl";

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
      <LayersControl>
        <LayersControl.BaseLayer name={MAP_LAYERS.OSM}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={21}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name={MAP_LAYERS.GMAP}>
          <TileLayer
            attribution="Google Maps"
            url="http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
            maxZoom={21}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name={MAP_LAYERS.GMAP_SAT}>
          <LayerGroup>
            <TileLayer
              attribution="Google Maps Satellite"
              url="https://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}"
              maxZoom={21}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name={MAP_LAYERS.GMAP_TERRAIN}>
          <LayerGroup>
            <TileLayer
              attribution="Google Maps Terrain"
              url="http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}"
              maxZoom={21}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayerGroup>
        </LayersControl.BaseLayer>
      </LayersControl>
      <EditControlFC geojson={geojson} setGeojson={setGeojson} mode={mode} />
      <FullscreenControl position="topleft" />
      <MapController />
    </MapContainer>
  );
}
