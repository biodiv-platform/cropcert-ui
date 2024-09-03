import { locationType, mapLayers } from "@static/constants";
import L from "leaflet";
import React, { useEffect, useMemo, useState } from "react";
import { GeoJSON, LayerGroup, LayersControl, MapContainer, TileLayer, useMap } from "react-leaflet";

interface IGeoJsonMapProps {
  geoJsonData: any;
  isDraggable: boolean | undefined;
  setNewLatLng: any | null;
}

const mapStyle = {
  width: "100%",
  height: "100%",
};

const GeoJsonMap = (props: IGeoJsonMapProps) => {
  const { geoJsonData, isDraggable } = props;
  const [map, setMap] = useState<L.Map | null>(null);

  // Calculate bounds and center based on GeoJSON data
  const { bounds, center } = useMemo(() => {
    if (geoJsonData && geoJsonData.type === "Feature") {
      const layer = L.geoJSON(geoJsonData);
      const bounds = layer.getBounds();
      const center = bounds.getCenter();

      switch (geoJsonData.geometry.type) {
        case locationType.POINT:
          return {
            bounds: bounds,
            center: [geoJsonData.geometry.coordinates[1], geoJsonData.geometry.coordinates[0]],
          };
        case locationType.MULTI_POINT:
        case locationType.MULTI_POLYGON:
          return { bounds: bounds, center: center };
        default:
          break;
      }
    }
    return {
      bounds: L.latLngBounds(L.latLng(1.438082, 32.3232571), L.latLng(1.438082, 32.3232571)),
      center: [1.438082, 32.3232571], // Default center (Uganda)
    };
  }, [geoJsonData]);

  function MapController() {
    const map = useMap();
    useEffect(() => {
      setMap(map);
    }, [map]);
    return null;
  }

  useEffect(() => {
    if (map) {
      const handleResize = () => {
        map.invalidateSize();
        map.fitBounds(bounds);
      };

      handleResize(); // Call immediately

      // Set up a timer to call handleResize multiple times
      const timerId = setInterval(handleResize, 100);

      // Clear the timer after 1 second
      setTimeout(() => {
        clearInterval(timerId);
      }, 1000);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [map, bounds]);

  // Function to calculate approximate area of a polygon
  const calculatePolygonArea = (coordinates) => {
    const EARTH_RADIUS = 6371000; // Earth's radius in meters

    function toRadians(degree) {
      return (degree * Math.PI) / 180;
    }

    let area = 0;
    if (coordinates && coordinates.length > 0) {
      for (let i = 0; i < coordinates[0].length; i++) {
        const j = (i + 1) % coordinates[0].length;
        const xi = toRadians(coordinates[0][i][0]); // longitude
        const yi = toRadians(coordinates[0][i][1]); // latitude
        const xj = toRadians(coordinates[0][j][0]); // longitude
        const yj = toRadians(coordinates[0][j][1]); // latitude

        const calcArea = (xj - xi) * (2 + Math.sin(yi) + Math.sin(yj));
        area += calcArea;
      }
    }
    area = Math.abs((area * EARTH_RADIUS * EARTH_RADIUS) / 2);
    return area;
  };

  if (!geoJsonData || !geoJsonData.type || !geoJsonData.geometry) {
    console.error("Invalid GeoJSON data:", geoJsonData);
    return null; // or return a fallback UI
  }

  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13} style={mapStyle}>
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
          const customPopupContent = `
            <div style="display: flex; flex-direction: column; align-items: flex-start;">
              <h3 style="margin: 0; font-size: 16px">${feature.properties.name}</h3>
              <p><strong>Farmer ID:</strong> ${feature.properties.farmerId}</p>
              <p><strong>CC:</strong> ${feature.properties.cc}</p>
              <p><strong>No. of farms:</strong> ${feature.properties.noOfFarmPlots}</p>
            </div>
          `;

          // Create a marker for each point and bind the custom popup
          const marker = L.marker(latlng, { draggable: isDraggable });
          marker.bindPopup(customPopupContent);

          return marker;
        }}
        style={() => {
          return {
            fillColor: "#3388ff",
            weight: 2,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
          };
        }}
        onEachFeature={(feature, layer) => {
          if (feature.geometry.type === locationType.MULTI_POLYGON) {
            // @ts-ignore
            const totalArea = feature.geometry.coordinates.reduce(
              (sum, polygon) => sum + calculatePolygonArea(polygon),
              0
            );
            const areaInSquareMeters = Math.round(totalArea); // Round to nearest whole number
            layer.bindPopup(`
              <div style="display: flex; flex-direction: column; align-items: flex-start;">
                <h3 style="margin: 0; font-size: 16px">${
                  feature.properties.name || "MultiPolygon"
                }</h3>
                <p><strong>Farmer ID:</strong> ${feature.properties.farmerId}</p>
              <p><strong>CC:</strong> ${feature.properties.cc}</p>
                <p><strong>Approximate Area:</strong> ${areaInSquareMeters.toLocaleString()} m²</p>
                <p><strong>No. of farms:</strong> ${feature.properties.noOfFarmPlots}</p>
              </div>
            `);
          }
        }}
      />
      <MapController />
    </MapContainer>
  );
};

export default GeoJsonMap;
