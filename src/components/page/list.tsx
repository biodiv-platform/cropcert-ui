import "./list.scss";

import ArrowLeft from "@carbon/icons-react/es/arrow--left/20";
import ArrowRight from "@carbon/icons-react/es/arrow--right/20";
import DocumentAdd from "@carbon/icons-react/es/document--add/20";
import Edit from "@carbon/icons-react/es/edit/20";
import { axUpdateTree } from "@services/pages.services";
import { treeToFlat } from "@utils/pages.util";
import { Button, Search } from "carbon-components-react";
import { navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";

export default function PageList({ pages }) {
  const [searchString, setSearchString] = useState("");
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);
  const [searchFoundCount, setSearchFoundCount] = useState(0);
  const [treeData, setTreeData] = useState([] as any);
  const [flatOrder, setFlatOrder] = useState([] as any);

  useEffect(() => {
    setTreeData(pages);
  }, [pages]);

  const handleTreeOnChange = td => {
    setTreeData(td);
  };

  const handleSearchOnChange = e => {
    setSearchString(e.target.value);
  };

  const selectPrevMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null
        ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        : searchFoundCount - 1
    );
  };

  const selectNextMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0
    );
  };

  const toggleNodeExpansion = expanded => {
    setTreeData(
      toggleExpandedForAll({
        treeData,
        expanded,
      })
    );
  };

  const alertNodeInfo = ({ node, path, treeIndex }) => {
    const objectString = Object.keys(node)
      .map(k => (k === "children" ? "children: Array" : `${k}: '${node[k]}'`))
      .join(",\n   ");

    alert(
      "Info passed to the button generator:\n\n" +
        `node: {\n   ${objectString}\n},\n` +
        `path: [${path.join(", ")}],\n` +
        `treeIndex: ${treeIndex}`
    );
  };

  const managePage = id => {
    navigate(`/page/manage?id=${id}&mode=edit`);
  };

  const createPage = (id = -1) => {
    navigate(`/page/manage?parentId=${id}&mode=create`);
  };

  const generateNodeProps = rowInfo => ({
    buttons: [
      <button
        key={`edit_${rowInfo.node.id}`}
        className="eco--btn-transparent"
        onClick={() => managePage(rowInfo.node.id)}
      >
        <Edit />
      </button>,
      <button
        key={`add_${rowInfo.node.id}`}
        className="eco--btn-transparent"
        onClick={() => createPage(rowInfo.node.id)}
      >
        <DocumentAdd />
      </button>,
    ],
  });

  const createRootPage = () => {
    navigate("/page/manage?parentId=-1&mode=create");
  };

  const handleMoveNode = e => {
    setFlatOrder(treeToFlat(e.treeData));
  };

  const saveUpdatedTree = () => {
    axUpdateTree(flatOrder);
  };

  const RenderSortableTree = () => (
    <SortableTree
      treeData={treeData}
      onChange={handleTreeOnChange}
      onMoveNode={handleMoveNode}
      maxDepth={5}
      searchQuery={searchString}
      searchFocusOffset={searchFocusIndex}
      canDrag={({ node }) => !node.noDragging}
      canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
      searchFinishCallback={matches => {
        setSearchFoundCount(matches.length);
        setSearchFocusIndex(
          matches.length > 0 ? searchFocusIndex % matches.length : 0
        );
      }}
      isVirtualized={true}
      generateNodeProps={generateNodeProps}
    />
  );

  return (
    <>
      <div className="bx--row mt-2">
        <div className="bx--col-lg-6 bx--col-md-12">
          <h1 className="eco--title">Static Pages</h1>
        </div>
        <div className="bx--col-lg-6 bx--col-md-12 text-right mt-2">
          <Button onClick={createRootPage}>Create Menu Item</Button>
          <Button className="ml-2" onClick={saveUpdatedTree}>
            Save Reordering
          </Button>
        </div>
      </div>
      <div className="bx--row mt-2">
        <div className="bx--col-lg-6 bx--offset-lg-3 bx--col-md-12 text-right mt-2">
          <Button onClick={() => toggleNodeExpansion(true)}>Expand all</Button>
          <Button className="ml-2" onClick={() => toggleNodeExpansion(false)}>
            Collapse all
          </Button>
        </div>
        <div className="bx--col-lg-3 bx--col-md-12 mt-2">
          <div style={{ display: "flex" }}>
            <Search
              labelText="Search"
              onChange={handleSearchOnChange}
              id="search-1"
            />
            <button
              onClick={selectPrevMatch}
              className="bx--search-button"
              type="button"
              aria-label={"Previous"}
              title={"Previous"}
            >
              <ArrowLeft />
            </button>
            <button
              onClick={selectNextMatch}
              className="bx--search-button"
              type="button"
              aria-label={"Next"}
              title={"Next"}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="tree-wrapper">
          {treeData.length > 0 && RenderSortableTree()}
        </div>
      </div>
    </>
  );
}
