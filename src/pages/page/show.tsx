import "@styles/medium.scss";

import { Add16, Edit16 } from "@carbon/icons-react";
import Container from "@components/@core/container";
import withLocation from "@components/withLocation";
import { axGetPageByPageId } from "@services/pages.services";
import { Button } from "carbon-components-react";
import { Link } from "gatsby";
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
          <div className="float-right">
            <Button
              as={Link}
              className="mr-2"
              renderIcon={Add16}
              to={`/page/list`}
            >
              Create
            </Button>
            <Button
              as={Link}
              renderIcon={Edit16}
              to={`/page/manage?id=${query.id}&mode=edit`}
            >
              Edit
            </Button>
          </div>
          <h1>{page.data.heading}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.data.content }} />
        </div>
      )}
    </Container>
  );
};

export default withLocation(ShowPage);
