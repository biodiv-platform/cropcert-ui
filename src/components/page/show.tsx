import "@styles/medium.scss";

import { Add16, Edit16 } from "@carbon/icons-react";
import { hasAccess } from "@utils/auth.util";
import { ROLES } from "@utils/constants";
import { Button } from "carbon-components-react";
import { Link } from "gatsby";
import React from "react";

const PageShowComponent = ({ page }) => (
  <>
    {page.success && (
      <div className="blog">
        {hasAccess([ROLES.ADMIN]) && (
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
              to={`/page/manage?id=${page.data.id}&mode=edit`}
            >
              Edit
            </Button>
          </div>
        )}
        <h1>{page.data.heading}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.data.content }} />
      </div>
    )}
  </>
);

export default PageShowComponent;
