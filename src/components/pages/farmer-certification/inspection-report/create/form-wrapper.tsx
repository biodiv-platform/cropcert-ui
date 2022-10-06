import { STORE } from "@static/inspection-report";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useIndexedDBStore } from "use-indexeddb";

import InspectionForm from "./form";

export default function InspectionFormWrapper() {
  const [farmer, setFarmer] = useState<any>();
  const { getOneByKey } = useIndexedDBStore(STORE.FARMERS);
  const router = useRouter();

  const fetchFarmer = async () => {
    const f = await getOneByKey("id", Number(router.query.feFarmerId));
    setFarmer(f);
  };

  useEffect(() => {
    fetchFarmer();
  }, []);

  return farmer ? <InspectionForm farmer={farmer} /> : null;
}
