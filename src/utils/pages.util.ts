interface FlatOption {
  id: string;
  parent: string;
  children: string;
}

export const flatToTree = (rows, options?: FlatOption) => {
  var idProp = options ? options.id : "id";
  var parentProp = options ? options.parent : "parentId";
  var childProp = options ? options.children : "children";

  function exists(rows, parent) {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i][idProp] == parent) return true;
    }
    return false;
  }

  var nodes: any = [];
  0;

  // get the top level nodes
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if (!exists(rows, row[parentProp])) {
      nodes.push(Object.assign({}, row));
    }
  }

  var toDo: any = [];
  for (var i = 0; i < nodes.length; i++) {
    toDo.push(nodes[i]);
  }

  while (toDo.length) {
    var node = toDo.shift();

    // the parent node
    // get the children nodes
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (row[parentProp] == node[idProp]) {
        var child = Object.assign({}, row);
        node[childProp] = node[childProp] || [];
        node[childProp].push(child);
        toDo.push(child);
      }
    }
  }

  return nodes;
};

export const treeToFlat = (tree, parentId = -1) => {
  let flatTree: any = [];
  tree.map((o, i) => {
    flatTree.push({ id: o.id, index: i, parentId });
    if (o.hasOwnProperty("children")) {
      flatTree = [...flatTree, ...treeToFlat(o.children, o.id)];
    }
  });
  return flatTree;
};
