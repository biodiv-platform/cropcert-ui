import Container from "@components/@core/container";
import PageShowComponent from "@components/page/show";
import { axGetPageByPageId } from "@services/pages.services";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [page, setPage] = useState({ success: false, data: {} as any });

  useEffect(() => {
    axGetPageByPageId(1).then(data => setPage(data));
  }, []);

  return <Container>{page.success && <PageShowComponent page={page} />}</Container>;
};

export default HomePage;
