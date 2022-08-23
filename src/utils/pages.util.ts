import autoToC from "auto-toc";

export const generateToC = (contentSelector, tocSelector) => {
  const content = document.querySelector(contentSelector);
  const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6, h7");
  const headingMap = {};

  Array.prototype.forEach.call(headings, function (heading) {
    const id = heading.id
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

export const getPagesMenu = (children) => {
  return children.map((l) => {
    const link = { name: l.title, to: `/page/${l.id}` };
    if (l.children.length > 0) {
      return { ...link, rows: getPagesMenu(l.children) };
    }
    return link;
  });
};

export const treeToFlat = (children: any[], parentId = 0) =>
  children.reduce(
    (acc, cv, pageIndex) => [
      {
        id: cv.id,
        parentId,
        pageIndex,
      },
      ...(cv.children.length ? treeToFlat(cv.children, cv.id) : []),
      ...acc,
    ],
    []
  );

export const flatToTree = (rows, options?) => {
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

export const preProcessContent = (content) =>
  content
    .replace(/\<table/g, '<div class="table-responsive"><table')
    .replace(/\<\/table\>/g, "</table></div>");
