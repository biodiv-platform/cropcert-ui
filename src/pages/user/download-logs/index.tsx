import { DownloadLogsDataProvider } from "@components/pages/user/common/use-download-log";
import { axGetDownloadLogsList } from "@services/user.service";
const DownloadLogListComponent = dynamic(
  () => import("@components/pages/user/list/download-logs"),
  { ssr: false }
);

import { LIST_PAGINATION_LIMIT } from "@static/documnet-list";
import dynamic from "next/dynamic";
import React from "react";

const DownloadLogsList = ({ downloadLogData, initialFilterParams }) => (
  <DownloadLogsDataProvider filter={initialFilterParams} downloadLogData={downloadLogData}>
    <DownloadLogListComponent />
  </DownloadLogsDataProvider>
);

DownloadLogsList.config = {
  footer: false,
};

DownloadLogsList.getInitialProps = async (ctx) => {
  const { data } = await axGetDownloadLogsList({ offset: 0 });

  return {
    downloadLogData: {
      l: data.downloadLogList || [],
      ag: data.aggregate,
      n: data.count,
      hasMore: data.count > LIST_PAGINATION_LIMIT,
    },
    nextOffset: LIST_PAGINATION_LIMIT,
    initialFilterParams: { ...ctx.query },
  };
};

export default DownloadLogsList;
