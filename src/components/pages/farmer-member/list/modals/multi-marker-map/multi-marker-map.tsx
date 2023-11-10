import { Box, Heading, Text } from "@chakra-ui/react";
import L from "leaflet";
import React from "react";
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Define a function to create a colored marker icon with an SVG
const createColoredIcon = (color) => {
  const borderColor = color.borderColor;
  const insideColor = color.insideColor;
  const circleColor = color.circleColor;
  const circleRadius = 22; // Set your desired radius
  const strokeWidth = 3; // Set your desired border width

  return L.divIcon({
    className: "custom-marker",
    iconSize: [32, 45],
    iconAnchor: [16, 45],
    popupAnchor: [1, -34],
    html: `<svg width="32px" height="45px" viewBox="38 12 128 180">
              <path style="fill:${insideColor};stroke:${borderColor};stroke-width:${strokeWidth};stroke-miterlimit:10;" d="M158.5,73.8c0-32.3-26.2-58.4-58.4-58.4c-32.3,0-58.4,26.2-58.4,58.4c0,16.6,6.9,31.5,18,42.1c7.2,7.2,16.7,17.2,20.1,22.5c7,10.9,20,47.9,20,47.9s13.3-37,20.4-47.9c3.3-5.1,12.2-14.4,19.3-21.6C151.2,106.1,158.5,90.9,158.5,73.8z"/>
              <circle style="fill:${circleColor};" cx="100.1" cy="74.7" r="${circleRadius}"/>
          </svg>`,
  });
};

export default function FarmerMap({ coordinatesArray }) {
  const mapStyle = {
    width: "100%", // Set the width of the map
    height: "100%", // Set the height of the map
  };

  const bounds = L.latLngBounds(
    coordinatesArray.map((coordinates) => L.latLng(coordinates.lat, coordinates.long))
  );

  return (
    <MapContainer bounds={bounds} scrollWheelZoom={false} style={mapStyle}>
      <LayersControl>
        <LayersControl.BaseLayer name="Open Street Map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Google Map">
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Map Satellite">
          <LayerGroup>
            <TileLayer
              attribution="Google Maps Satellite"
              url="https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
          </LayerGroup>
        </LayersControl.BaseLayer>
      </LayersControl>

      {coordinatesArray.map((coordinates, index) => (
        <Marker
          key={index}
          position={[coordinates.lat, coordinates.long]}
          icon={createColoredIcon(coordinates?.color)}
        >
          <Popup>
            <Box>
              <Heading as="h3" size="md">
                {coordinates.name}
              </Heading>
              <Text>
                <strong>Farmer ID:</strong> {coordinates.farmerId}
              </Text>
              <Text>
                <strong>CC:</strong> {coordinates.cc}
              </Text>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
