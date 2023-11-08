import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function FarmerMap({ coordinates, farmerName }) {
  const mapStyle = {
    width: "100%", // Set the width of the map
    height: "400px", // Set the height of the map
  };

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.long]}
      zoom={10}
      scrollWheelZoom={true}
      style={mapStyle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coordinates.lat, coordinates.long]}>
        <Popup>{farmerName}</Popup>
      </Marker>
    </MapContainer>
  );
}
