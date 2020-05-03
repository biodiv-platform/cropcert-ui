interface FlatOption {
  id: string;
  parent: string;
  children: string;
}

export const flatToTree = (rows, options?: FlatOption) => {
  const idProp = options ? options.id : "id";
  const parentProp = options ? options.parent : "parentId";
  const childProp = options ? options.children : "children";

  function exists(treeRows, parent) {
    for (const row of treeRows) {
      if (row[idProp] === parent) {
        return true;
      }
    }
    return false;
  }

  const nodes: any = [];

  // get the top level nodes
  rows.forEach((row) => {
    if (!exists(rows, row[parentProp])) {
      nodes.push({ ...row });
    }
  });

  const toDo: any = [];
  nodes.forEach((node) => {
    toDo.push(node);
  });

  while (toDo.length) {
    const node = toDo.shift();

    // the parent node
    // get the children nodes
    rows.forEach((row) => {
      if (row[parentProp] === node[idProp]) {
        const child = { ...row };
        node[childProp] = node[childProp] || [];
        node[childProp].push(child);
        toDo.push(child);
      }
    });
  }

  return nodes.sort((a, b) => a.pageIndex - b.pageIndex);
};

export const treeToFlat = (tree, parentId = -1) => {
  let flatTree: any = [];
  tree.map((o, i) => {
    flatTree.push({ id: o.id, pageIndex: i, parentId });
    if (o.hasOwnProperty("children")) {
      flatTree = [...flatTree, ...treeToFlat(o.children, o.id)];
    }
  });
  return flatTree;
};
