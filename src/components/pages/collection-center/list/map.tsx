import { MAP } from "@static/map";
import L from "leaflet";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function CCListMap({ ccList, selected }) {
  useEffect(() => {
    delete L.Icon.Default.prototype["_getIconUrl"];
    L.Icon.Default.mergeOptions(MAP.MARKER_MERGEOPTIONS);
  }, []);

  const getMarkerProps = (ccId) =>
    selected?.id === ccId
      ? { icon: L.icon(MAP.MARKER_SELECTED), zIndexOffset: 999 }
      : { icon: L.icon(MAP.MARKER_MERGEOPTIONS), zIndexOffset: 0 };

  return (
    <MapContainer center={MAP.MAP_CENTER} zoom={9}>
      <TileLayer url={MAP.TILE.URL} />
      {ccList.map((cc) => (
        <Marker
          key={cc.id}
          position={[cc.latitude, cc.longitude]}
          {...(getMarkerProps(cc.id) as any)}
        >
          <Popup>{`${cc.name} - ${cc.village}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
