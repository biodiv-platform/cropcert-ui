import { Box, Heading, Link, Text } from "@chakra-ui/react";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import { divIcon, latLng, latLngBounds } from "leaflet";
import NextLink from "next/link";
import React, { useEffect } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";

// Define a function to create a colored marker icon with an SVG
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

export default function FarmerMap({ coordinatesArray }) {
  const mapStyle = {
    width: "100%", // Set the width of the map
    height: "100%", // Set the height of the map
  };

  const bounds = latLngBounds(
    coordinatesArray.map((coordinates) => latLng(coordinates.lat, coordinates.long))
  );

  const paddedBounds = bounds.pad(0.1);

  const ZoomOut = () => {
    const map = useMap();

    useEffect(() => {
      map.fitBounds(paddedBounds);
    }, [coordinatesArray]);

    // map.setView(map.getCenter(), map.getZoom() - 1);
    return null;
  };

  return (
    <MapContainer
      bounds={paddedBounds}
      scrollWheelZoom={true}
      style={mapStyle}
      className="markercluster-map"
    >
      <ZoomOut />
      <LayersControl>
        <LayersControl.BaseLayer name="Open Street Map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={21}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Google Map">
          <TileLayer
            attribution="Google Maps"
            url="http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
            maxZoom={21}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Map Satellite">
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

      <MarkerClusterGroup
        maxClusterRadius={45}
        // disableClusteringAtZoom={19}
      >
        {coordinatesArray.map((coordinates, index) => (
          <Marker
            key={index}
            position={[coordinates.lat, coordinates.long]}
            icon={createColoredIcon(coordinates?.color)}
          >
            <Popup>
              <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
                <NextLink href={`/farmer/show/${coordinates._id}`} passHref={true}>
                  <Link>
                    <Heading as="h3" size="md">
                      {coordinates.name}
                    </Heading>
                  </Link>
                </NextLink>
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
      </MarkerClusterGroup>
    </MapContainer>
  );
}
