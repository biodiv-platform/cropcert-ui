import Container from "@components/@core/container";
import PageShowComponent from "@components/page/show";
import withLocation from "@components/withLocation";
import { axGetPageByPageId } from "@services/pages.services";
import React, { useEffect, useState } from "react";

const ShowPage = ({ query }) => {
  const [page, setPage] = useState({ success: false, data: {} as any });

  useEffect(() => {
    if (query.id) {
      axGetPageByPageId(query.id).then(data => setPage(data));
    }
  }, [query]);

  return (
    <Container>{page.success && <PageShowComponent page={page} />}</Container>
  );
};

export default withLocation(ShowPage);
