import "@styles/medium.scss";

import Container from "@components/@core/container";
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
    <Container>
      {page.success && (
        <div className="blog">
          <h1>{page.data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.data.content }} />
        </div>
      )}
    </Container>
  );
};

export default withLocation(ShowPage);
