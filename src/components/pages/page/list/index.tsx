import "./style.scss";

import { Button, ButtonGroup, Link } from "@chakra-ui/core";
import { PageHeading } from "@components/@core/layout";
import { axListPages, axUpdateTree } from "@services/page.service";
import { PAGE_DELETE } from "@static/events";
import { PAGES } from "@static/messages";
import notification, { NotificationType } from "@utils/notification.util";
import { flatToTree, treeToFlat } from "@utils/pages.util";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { emit } from "react-gbus";
import { MdAdd, MdDelete, MdEdit, MdNoteAdd, MdSave } from "react-icons/md";
import SortableTree from "react-sortable-tree";

import DeletePageModal from "./delete-page-modal";

export default function PageListComponent() {
  const [treeData, setTreeData] = useState([]);
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
          <MdEdit />
        </Link>
      </NextLink>,
      <NextLink key={`add_${row.node.id}`} href={`/page/add/${row.node.id}`} passHref={true}>
        <Link>
          <MdNoteAdd />
        </Link>
      </NextLink>,
      <Link key={`delete_${row.node.id}`} onClick={() => emit(PAGE_DELETE, row.node)}>
        <MdDelete />
      </Link>,
    ],
  });

  const ActionButtons = () => (
    <ButtonGroup spacing={4}>
      <Button variantColor="green" variant="solid" onClick={saveUpdatedTree} leftIcon={MdSave}>
        Save
      </Button>
      <NextLink href={`/page/add/-1`} passHref={true}>
        <Button as={Link} variantColor="blue" variant="solid" leftIcon={MdAdd}>
          Create Root Page
        </Button>
      </NextLink>
    </ButtonGroup>
  );

  return (
    <div>
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
    </div>
  );
}
