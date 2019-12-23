import EditPageComponent from "@components/pages/page/edit";
import React from "react";

const EditPage = ({ pageId }) => <EditPageComponent pageId={pageId} />;

EditPage.getInitialProps = async ({ query }) => ({ pageId: query.id });

export default EditPage;
