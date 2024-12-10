import useGlobalState from "@hooks/use-global-state";
import { axGetLastSyncedTimeFM, axGetLastSyncedTimeFP } from "@services/traceability.service";
import { useQuery } from "@tanstack/react-query";
import { formatTimeDifference } from "@utils/date";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

export default function LastSyncTime({ type, isSyncing }) {
  const { union } = useGlobalState();
  const { t } = useTranslation();
  const [timeString, setTimeString] = useState<string>("");

  const queryKey = type === "FM" ? ["lastSyncedTimeFM"] : ["lastSyncedTimeFP"];
  const queryFn =
    type === "FM"
      ? () => axGetLastSyncedTimeFM(union?.value)
      : () => axGetLastSyncedTimeFP(union?.value);

  const { data } = useQuery({
    queryKey,
    queryFn,
    enabled: !!union?.value || isSyncing,
    refetchInterval: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        setTimeString(formatTimeDifference(data?.data));
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [data?.data]);
  return (
    <>
      {t("traceability:sync_status.last_synced")} {timeString}
    </>
  );
}
