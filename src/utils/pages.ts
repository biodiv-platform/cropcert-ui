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

export const getLinkCard = ({ href, image, title, description }: any, id, cardClass) => {
  const emptyImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";

  return `
      <a href="${href}" rel="noopener noreferrer" class="${cardClass}" id="${id}">
        <img alt="${title}" src="${image || emptyImage}"/>
        <div>
          <div class="label" title="${title}">${title || href}</div>
          <p title="${description}">${description || ""}</p>
        </div>
      </a>`;
};

export const addCustomStyle = (content) => {
  let customStyle = "";

  if (content.includes("img-wrap-left")) {
    customStyle += "<style> .img-wrap-left { float: left; margin-right: 40px;} </style>";
  }

  if (content.includes("img-wrap-right")) {
    customStyle += "<style> .img-wrap-right { float: right; margin-left: 40px; } </style>";
  }

  return content + customStyle;
};

export const getIframe = ({ href }: any, id, width, height) => {
  return `
  <p><iframe id="${id}" src="${href}" width="${width}" height="${height}" frameborder="0" allowfullscreen="allowfullscreen"></iframe></p>`;
};

export const preProcessContent = (content) => {
  let processedContent = content;

  const replacements = [
    { regex: /<a.+preview-card.+<\/a>/gm, cardType: "epc" },
    { regex: /<a.+banner-card.+<\/a>/gm, cardType: "banner" },
    { regex: /<a.+video.+<\/a>/gm, cardType: "video" },
  ];

  replacements.forEach(({ regex, cardType }, index) => {
    processedContent = processedContent.replace(regex, (match) => {
      const href = /<a[\s\S]*?href=["']([^"']+)["']/?.exec(match)?.[1];

      if (cardType === "video") {
        return getIframe({ href }, `video-${index}`, "100%", "315");
      } else {
        return getLinkCard({ href }, `${cardType}-${index}`, cardType);
      }
    });
  });

  processedContent = addCustomStyle(processedContent);

  return processedContent
    .replace(/\<table/g, '<div class="table-responsive"><table')
    .replace(/\<\/table\>/g, "</table></div>");
};

/**
 * This removes wrapper `<p/>` elements from card type links to prevent stacking layout issues
 *
 * @param {*} html
 * @return {*}
 */
export const removeCardWrapperParagraphs = (html) => {
  try {
    // Check if the HTML contains a <style> tag
    if (/<style[\s\S]*?>[\s\S]*?<\/style>/i.test(html)) {
      return html;
    }
    const parser = new DOMParser();

    const _dom = parser.parseFromString(html, "text/html");

    _dom.querySelectorAll("p > .preview-card, p > .banner-card").forEach((e: any) => {
      if (e.parentElement.tagName === "P") {
        e.parentElement.replaceWith(...e.parentElement.childNodes);
      }
    });

    return _dom.body.innerHTML.split("</a>").join("</a>\n");
  } catch (e) {
    console.error(e);
    return html;
  }
};
