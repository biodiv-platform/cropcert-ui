import autoToC from "auto-toc";

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

export const generateToC = (contentSelector, tocSelector) => {
  var content = document.querySelector(contentSelector);
  var headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6, h7");
  var headingMap = {};

  Array.prototype.forEach.call(headings, function (heading) {
    var id = heading.id
      ? heading.id
      : heading.textContent
          .trim()
          .toLowerCase()
          .split(" ")
          .join("-")
          .replace(/[!@#$%^&*():]/gi, "")
          .replace(/\//gi, "-");
    headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0;
    if (headingMap[id]) {
      heading.id = id + "-" + headingMap[id];
    } else {
      heading.id = id;
    }
  });
  autoToC(contentSelector, tocSelector);
};

export const wrapResponsiveTable = (content: string = "") => {
  return content
    .replace(/\<table/g, '<div class="table-responsive"><table')
    .replace(/\<\/table\>/g, "</table></div>");
};
