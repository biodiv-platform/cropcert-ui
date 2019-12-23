import AddPageComponent from "@components/pages/page/add";
import React from "react";

const EditPage = ({ parentId }) => <AddPageComponent parentId={parentId} />;

EditPage.getInitialProps = async ({ query }) => ({ parentId: query.parentId });

export default EditPage;
