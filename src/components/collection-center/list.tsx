import DataTable from "@components/@core/table";
import { axListCC } from "@services/cc.service";
import { isBrowser, MAP } from "@utils/constants";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import ListColumns from "./list-columns";

export default function CollectionCenterListPage() {
  const [CCList, setCCList] = useState({
    success: false,
    data: [] as any,
  });

  useEffect(() => {
    delete L.Icon.Default.prototype["_getIconUrl"];
    L.Icon.Default.mergeOptions(MAP.MARKER_MERGEOPTIONS);
    axListCC().then(d => setCCList(d));
  }, []);

  return (
    <>
      <h1 className="eco--title">Collection Centers</h1>
      {CCList.data.length > 0 && (
        <div className="bx--row">
          <div className="bx--col-lg-6 bx--col-md-12">
            <DataTable
              keyField="ccId"
              columns={ListColumns()}
              noHeader={true}
              data={CCList.data}
              fixedHeader={true}
              fixedHeaderScrollHeight="calc( 70vh - 48px )"
            />
          </div>
          <div className="bx--col-lg-6 bx--col-md-12">
            {isBrowser && (
              <Map center={MAP.MAP_CENTER} zoom={9}>
                <TileLayer
                  attribution={MAP.TILE.ATTRIBUTION}
                  url={MAP.TILE.URL}
                />
                {CCList.data.map(cc => (
                  <Marker
                    key={cc["id"]}
                    position={[cc["latitude"], cc["longitude"]]}
                  >
                    <Popup>{`${cc.ccName} - ${
                      cc.village
                    }`}</Popup>
                  </Marker>
                ))}
              </Map>
            )}
          </div>
        </div>
      )}
    </>
  );
}
