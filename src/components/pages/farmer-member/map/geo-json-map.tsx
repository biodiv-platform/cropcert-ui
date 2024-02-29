import { mapLayers } from "@static/constants";
import L from "leaflet";
import React, { useEffect, useMemo } from "react";
import { GeoJSON, LayerGroup, LayersControl, MapContainer, TileLayer, useMap } from "react-leaflet";

const GeoJsonMap = ({ geoJsonData }) => {
  // Calculate center based on GeoJSON data
  const center = useMemo(() => {
    if (geoJsonData && geoJsonData.type === "Feature" && geoJsonData.geometry.type === "Point") {
      // Directly return the coordinates for a single point
      return [geoJsonData.geometry.coordinates[1], geoJsonData.geometry.coordinates[0]];
    } else if (
      geoJsonData &&
      geoJsonData.type === "Feature" &&
      geoJsonData.geometry.type === "MultiPoint"
    ) {
      // Calculate the average of coordinates for a MultiPoint
      const coords = geoJsonData.geometry.coordinates;
      const average = coords.reduce(
        (acc, coord) => {
          acc[0] += coord[0] / coords.length;
          acc[1] += coord[1] / coords.length;
          return acc;
        },
        [0, 0]
      );
      return [average[1], average[0]]; // Convert [long, lat] to [lat, long] for Leaflet
    }
    // Default center if no data or unsupported type
    return [42.35725, -71.060982];
  }, [geoJsonData]);

  function InvalidateCache() {
    const map = useMap();
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }, [map]);

    return null;
  }

  return (
    <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
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
      <GeoJSON
        data={geoJsonData}
        pointToLayer={(feature, latlng) => {
          // Custom popup content
          const customPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
              <h3 style="margin: 0;">${feature.properties.name}</h3>
              <p><strong>Farmer ID:</strong> ${feature.properties.farmerId}</p>
              <p><strong>CC:</strong> ${feature.properties.cc}</p>
            </div>
          `;

          // Create a marker for each point and bind the custom popup
          const marker = L.marker(latlng);
          marker.bindPopup(customPopupContent);

          return marker;
        }}
      />
      <InvalidateCache />
    </MapContainer>
  );
};

export default GeoJsonMap;
