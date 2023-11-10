import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function FarmerMap({ farmerInfo }) {
  const mapStyle = {
    width: "100%", // Set the width of the map
    height: "100%", // Set the height of the map
  };

  const markerRef = useRef(null);

  const handleMouseOver = () => {
    if (markerRef.current != null) {
      (markerRef.current as any).openPopup();
    }
  };

  const handleMouseOut = () => {
    if (markerRef.current != null) {
      (markerRef.current as any).closePopup();
    }
  };

  // Calculate padding for bounds
  const padding = 0.03; // Adjust as needed

  return (
    farmerInfo && (
      <MapContainer
        center={[farmerInfo.lat, farmerInfo.long]}
        scrollWheelZoom={true}
        bounds={[
          [farmerInfo.lat - padding, farmerInfo.long - padding],
          [farmerInfo.lat + padding, farmerInfo.long + padding],
        ]}
        style={mapStyle}
      >
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

        <Marker
          position={[farmerInfo.lat, farmerInfo.long]}
          eventHandlers={{ mouseover: handleMouseOver, mouseout: handleMouseOut }}
          ref={markerRef}
        >
          <Popup>
            <Box>
              <Heading as="h3" size="md">
                {farmerInfo.name}
              </Heading>
              <Text>
                <strong>Farmer ID:</strong> {farmerInfo.farmerId}
              </Text>
              <Text>
                <strong>CC:</strong> {farmerInfo.cc}
              </Text>
            </Box>
          </Popup>
        </Marker>
      </MapContainer>
    )
  );
}
