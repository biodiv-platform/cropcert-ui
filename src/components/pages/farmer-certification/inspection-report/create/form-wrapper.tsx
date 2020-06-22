import { STORE } from "@static/inspection-report";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIndexedDBStore } from "use-indexeddb";

import InspectionForm from "./form";

export default function InspectionFormWrapper() {
  const [farmer, setFarmer] = useState<any>();
  const { getOneByIndex } = useIndexedDBStore(STORE.FARMERS);
  const router = useRouter();

  const fetchFarmer = async () => {
    const f = await getOneByIndex("id", Number(router.query.farmerId));
    setFarmer(f);
  };

  useEffect(() => {
    fetchFarmer();
  }, []);

  return farmer ? <InspectionForm farmer={farmer} /> : null;
}
