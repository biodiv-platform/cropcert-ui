import "react-leaflet-fullscreen/styles.css";
import "leaflet-draw/dist/leaflet.draw.css";

import { mapLayers } from "@static/constants";
import L from "leaflet";
import React, { useEffect, useMemo, useRef } from "react";
import { LayerGroup, LayersControl, MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { FullscreenControl } from "react-leaflet-fullscreen";

export default function GeoJsonPointMap({ geojson }) {
  const mapRef = useRef(null);

  const result = useMemo(() => {
    if (geojson) {
      if (geojson.type === "Point" && geojson.coordinates.length === 2) {
        const latlng = L.latLng(geojson.coordinates[1], geojson.coordinates[0]);
        return {
          bounds: L.latLngBounds([latlng]),
          center: latlng,
        };
      }
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
        if (bounds) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }, 250);
    }, [map, bounds]);
    return null;
  }

  return (
    <MapContainer center={center} zoom={14} ref={mapRef} style={mapStyle}>
      <LayersControl>
        <LayersControl.BaseLayer name={mapLayers.OSM}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={21}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name={mapLayers.GMAP}>
          <TileLayer
            attribution="Google Maps"
            url="http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
            maxZoom={21}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name={mapLayers.GMAP_SAT}>
          <LayerGroup>
            <TileLayer
              attribution="Google Maps Satellite"
              url="https://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}"
              maxZoom={21}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name={mapLayers.GMAP_TERRAIN}>
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

      {geojson.type === "Point" && (
        <Marker position={[geojson.coordinates[1], geojson.coordinates[0]]}>
          <MapController />
        </Marker>
      )}

      <FullscreenControl position="topleft" />
    </MapContainer>
  );
}
