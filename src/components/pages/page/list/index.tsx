import { Button, ButtonGroup, Icon, Link } from "@chakra-ui/core";
import { PageHeading } from "@components/@core/layout";
import styled from "@emotion/styled";
import { axListPages, axUpdateTree } from "@services/page.service";
import { PAGE_DELETE } from "@static/events";
import { PAGES } from "@static/messages";
import notification, { NotificationType } from "@utils/notification.util";
import { flatToTree, treeToFlat } from "@utils/pages.util";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import SortableTree from "react-sortable-tree";

import DeletePageModal from "./delete-page-modal";

const PageListContainer = styled.div`
  .rst__rowWrapper {
    .rst__moveHandle {
      background-color: var(--gray-900);
      border: none;
      box-shadow: none;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }
    .rst__rowContents {
      box-shadow: none;
      border-top-right-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
    }
    .rst__toolbarButton {
      padding: 0 0.2rem;
      font-size: 1.3em;
      line-height: 1rem;
    }
  }
`;

export default function PageListComponent() {
  const [treeData, setTreeData] = useState<any>([]);
  const [flatOrder, setFlatOrder] = useState([] as any);

  const listAllPages = () => {
    axListPages().then((r) => setTreeData(flatToTree(r)));
  };

  const handleTreeOnChange = (td) => {
    setTreeData(td);
  };

  const handleMoveNode = (e) => setFlatOrder(treeToFlat(e.treeData));

  const saveUpdatedTree = async () => {
    const { success } = await axUpdateTree(flatOrder);
    if (success) {
      notification(PAGES.PAGE_REARRAGNED, NotificationType.Success);
    }
  };

  useEffect(listAllPages, []);

  const generateNodeProps = (row) => ({
    buttons: [
      <NextLink key={`edit_${row.node.id}`} href={`/page/edit/${row.node.id}`} passHref={true}>
        <Link>
          <Icon name="edit" />
        </Link>
      </NextLink>,
      <NextLink key={`add_${row.node.id}`} href={`/page/add/${row.node.id}`} passHref={true}>
        <Link>
          <Icon name="page" />
        </Link>
      </NextLink>,
      <Link key={`delete_${row.node.id}`} onClick={() => emit(PAGE_DELETE, row.node)}>
        <Icon name="delete" color="red.500" />
      </Link>,
    ],
  });

  const ActionButtons = () => (
    <ButtonGroup spacing={4}>
      <Button
        variantColor="green"
        variant="solid"
        onClick={saveUpdatedTree}
        leftIcon={"save" as any}
      >
        Save
      </Button>
      <NextLink href={`/page/add/-1`} passHref={true}>
        <Button as={Link} variantColor="blue" variant="solid" leftIcon={"add2" as any}>
          Create Root Page
        </Button>
      </NextLink>
    </ButtonGroup>
  );

  return (
    <PageListContainer>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://unpkg.com/react-sortable-tree@2.7.1/style.css"
        />
      </Head>
      <PageHeading actions={<ActionButtons />}>📄 Pages</PageHeading>
      <SortableTree
        treeData={treeData}
        onChange={handleTreeOnChange}
        onMoveNode={handleMoveNode}
        maxDepth={5}
        isVirtualized={false}
        canDrag={({ node }) => !node.noDragging}
        canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
        generateNodeProps={generateNodeProps}
      />
      <DeletePageModal update={listAllPages} />
    </PageListContainer>
  );
}
