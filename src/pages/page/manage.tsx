import Container from "@components/@core/container";
import ManagePage from "@components/page/manage";
import withLocation from "@components/withLocation";
import { axGetPageByPageId } from "@services/pages.services";
import React, { useEffect, useState } from "react";

const ManagePagePage = ({ query }) => {
  const [page, setPage] = useState({ success: false, data: {} });

  useEffect(() => {
    if (query.id) {
      axGetPageByPageId(query.id).then(data => setPage(data));
    }
  }, [query]);

  return (
    <Container>
      <ManagePage {...query} id={query.id || query.parentId} page={page.data} />
    </Container>
  );
};

export default withLocation(ManagePagePage);
