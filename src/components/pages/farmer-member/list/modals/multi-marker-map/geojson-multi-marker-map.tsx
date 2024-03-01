import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import { mapLayers } from "@static/constants";
import L, { divIcon, latLngBounds } from "leaflet";
import React, { useEffect } from "react";
import { GeoJSON, LayerGroup, LayersControl, MapContainer, TileLayer, useMap } from "react-leaflet";

export default function FarmerMap({ geojsonData }) {
  const mapStyle = {
    width: "100%",
    height: "100%",
  };

  const calculateBounds = (geojsonData) => {
    const bounds = latLngBounds([]);

    geojsonData.forEach((feature) => {
      const { type, coordinates } = feature.geometry;

      switch (type) {
        case "Point":
          bounds.extend([coordinates[1], coordinates[0]]);
          break;
        case "MultiPoint":
          coordinates.forEach((coord) => {
            bounds.extend([coord[1], coord[0]]);
          });
          break;
        // Add cases for other geometry types if needed
        default:
          console.warn(`Unsupported geometry type: ${type}`);
      }
    });

    return bounds;
  };

  const createColoredIcon = (color) => {
    const insideColor = color.insideColor;
    const circleRadius = 22; // Set your desired radius
    const strokeWidth = 9; // Set your desired border width

    return divIcon({
      className: "custom-marker",
      iconSize: [32, 45],
      iconAnchor: [16, 45],
      popupAnchor: [1, -34],
      html: `<svg width="32px" height="45px" viewBox="38 12 128 180">
                <path style="fill:${insideColor};stroke:#fafafa;stroke-width:${strokeWidth};stroke-miterlimit:10;" d="M158.5,73.8c0-32.3-26.2-58.4-58.4-58.4c-32.3,0-58.4,26.2-58.4,58.4c0,16.6,6.9,31.5,18,42.1c7.2,7.2,16.7,17.2,20.1,22.5c7,10.9,20,47.9,20,47.9s13.3-37,20.4-47.9c3.3-5.1,12.2-14.4,19.3-21.6C151.2,106.1,158.5,90.9,158.5,73.8z"/>
                <circle style="fill:#fafafa; opacity:0.8;" cx="100.1" cy="74.7" r="${circleRadius}"/>
            </svg>`,
    });
  };

  const ZoomOut = () => {
    const map = useMap();

    useEffect(() => {
      const bounds = calculateBounds(geojsonData);
      map.fitBounds(bounds, { padding: [40, 40] });
    }, [geojsonData]);

    return null;
  };

  return (
    <MapContainer scrollWheelZoom={true} style={mapStyle} className="markercluster-map">
      <ZoomOut />
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

      <MarkerClusterGroup key={JSON.stringify(geojsonData)}>
        <GeoJSON
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          pointToLayer={(point, ll) => {
            const popupString = `
            <div>
              <h1 class="popup-heading"><a href="/farmer/show/${point.properties._id}">${point.properties.name}</a></h1>
              <p>Farmer ID: ${point.properties.farmerId}</p>
              <p>CC: ${point.properties.cc}</p>
              <p>No of Farms: ${point.properties.noOfFarms}</p>
            </div>`;

            return new L.Marker(ll, {
              icon: createColoredIcon(point.properties.color),
            }).bindPopup(popupString);
          }}
          data={geojsonData}
        />
      </MarkerClusterGroup>
    </MapContainer>
  );
}
