import PageShowComponent from "@components/pages/page/show";
import { axGetPageByPageId } from "@services/page.service";
import React from "react";

const PageShow = ({ pageContent }) => (
  <>{pageContent.data && <PageShowComponent page={pageContent.data} />}</>
);

PageShow.getInitialProps = async ({ query, res }) => {
  const pageContent = await axGetPageByPageId(query.id);
  if (!pageContent.data) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  return { pageContent };
};

export default PageShow;
