import ShowPageComponent from "@components/pages/page/show";
import { axGetPageByPageId } from "@services/page.service";
import React from "react";

import HomePageComponent from "../components/pages/home";

const HomePage = ({ pageContent }) => (
  <>
    {pageContent.success && <ShowPageComponent page={pageContent.data} />}
    <HomePageComponent />
  </>
);

HomePage.getInitialProps = async () => {
  return { pageContent: await axGetPageByPageId(1) };
};

export default HomePage;
