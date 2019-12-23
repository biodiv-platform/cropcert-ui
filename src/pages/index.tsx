import HomePageComponent from "@components/pages/page/show";
import { axGetPageByPageId } from "@services/page.service";
import React from "react";

const HomePage = ({ pageContent }) => (
  <>{pageContent.success && <HomePageComponent page={pageContent.data} />}</>
);

HomePage.getInitialProps = async () => {
  return { pageContent: await axGetPageByPageId(1) };
};

export default HomePage;
