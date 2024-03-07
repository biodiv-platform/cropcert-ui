import { timeUntilNext } from "@utils/traceability";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";

export function NextSyncCounter() {
  const [time, setTime] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeUntilNext(120));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {t("traceability:sync_status.next_sync")} {Math.floor(time / 3600)}:
      {Math.floor((time / 60) % 60)}:{time % 60}
    </>
  );
}
