import ShowPageComponent from "@components/pages/page/show";
import { axGetPageByID } from "@services/pages.service";
import React from "react";

const HomePage = ({ pageContent }) => (
  <>
    {pageContent.success && (
      <ShowPageComponent page={pageContent.data} hideOgImage={true} showComments={false} />
    )}
  </>
);

HomePage.getInitialProps = async () => {
  return { pageContent: await axGetPageByID(1) };
};

export default HomePage;
