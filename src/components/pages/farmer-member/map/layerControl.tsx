import { MAP_LAYERS } from "@static/constants";
import React from "react";
import { LayerGroup, LayersControl, TileLayer } from "react-leaflet";

export default function LayerControl() {
  return (
    <LayersControl>
      <LayersControl.BaseLayer name={MAP_LAYERS.OSM}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={21}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name={MAP_LAYERS.GMAP}>
        <TileLayer
          attribution="Google Maps"
          url="http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={21}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer checked name={MAP_LAYERS.GMAP_SAT}>
        <LayerGroup>
          <TileLayer
            attribution="Google Maps Satellite"
            url="https://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}"
            maxZoom={21}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
        </LayerGroup>
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name={MAP_LAYERS.GMAP_TERRAIN}>
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
  );
}
