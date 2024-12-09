import { timeUntilNext } from "@utils/traceability";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

export function NextSyncCounter({ syncIntervalHours }) {
  const [time, setTime] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    // Calculate the initial time until the next sync
    setTime(timeUntilNext(syncIntervalHours));

    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1; // Decrement the time
        return newTime < 0 ? 0 : newTime; // Prevent negative time
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [syncIntervalHours]);

  return (
    <>
      {t("traceability:sync_status.next_sync")} {Math.floor(time / 3600)}:
      {Math.floor((time / 60) % 60)
        .toString()
        .padStart(2, "0")}
      :{time % 60}
    </>
  );
}
