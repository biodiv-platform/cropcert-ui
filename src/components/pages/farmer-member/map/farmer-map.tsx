// TODO: DELETE THIS FILE AFTER TESTING
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

export default function FarmerMap({
  farmerInfo,
  isDraggable,
  setNewLatLng,
  resetMarker,
  setResetMarker,
}) {
  const [position, setPosition] = useState([farmerInfo.lat, farmerInfo.long]);

  const mapStyle = {
    width: "100%", // Set the width of the map
    height: "100%", // Set the height of the map
  };

  // Calculate padding for bounds
  const padding = 0.03; // Adjust as needed

  function DraggableMarker() {
    const map = useMap();

    const markerRef = useRef(null);

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker: any = markerRef.current;
          if (marker != null) {
            setPosition([marker.getLatLng().lat, marker.getLatLng().lng]);
            setNewLatLng([marker.getLatLng().lat, marker.getLatLng().lng]);
          }
        },
      }),
      []
    );

    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }, [map]);

    useEffect(() => {
      if (resetMarker) {
        setPosition([farmerInfo.lat, farmerInfo.long]);
        setResetMarker(false);
      }
    }, [resetMarker]);

    return (
      <Marker
        draggable={isDraggable}
        eventHandlers={eventHandlers}
        position={[position[0], position[1]]}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
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
    );
  }

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
        zoom={18}
      >
        <LayersControl>
          <LayersControl.BaseLayer name="Open Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              maxZoom={21}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Map">
            <TileLayer
              attribution="Google Maps"
              url="http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
              maxZoom={21}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Google Map Satellite">
            <LayerGroup>
              <TileLayer
                attribution="Google Maps Satellite"
                url="https://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}"
                maxZoom={21}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Map Terrain">
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

        <DraggableMarker />
      </MapContainer>
    )
  );
}
