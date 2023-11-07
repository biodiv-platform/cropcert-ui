import L from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
export default function FarmerMap({ coordinatesArray }) {
  const mapStyle = {
    width: "100%", // Set the width of the map
    height: "800px", // Set the height of the map
  };

  const bounds = L.latLngBounds(
    coordinatesArray.map((coordinates) => L.latLng(coordinates.lat, coordinates.long))
  );

  return (
    <MapContainer bounds={bounds} scrollWheelZoom={true} style={mapStyle}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordinatesArray.map((coordinates, index) => (
        <Marker key={index} position={[coordinates.lat, coordinates.long]}>
          <Popup>{coordinates.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
