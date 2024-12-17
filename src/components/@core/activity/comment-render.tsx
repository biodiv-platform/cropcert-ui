import HTMLContainer from "@components/@core/html-container";
import { getInjectableHTML } from "@utils/text";
import React, { useEffect, useState } from "react";

const userMatch = /@\[([^\]]+?)\]\((\d+)\)/gm;

const CommentRender = ({ html }) => {
  const [nHtml, setNHtml] = useState(html);

  useEffect(() => {
    let preNHtml = html;
    let m;
    while ((m = userMatch.exec(html)) !== null) {
      preNHtml = preNHtml.replace(
        m[0],
        `<a class="mention-link" href="${`/user/show/${m[2]}`}">${m[1]}</a>`
      );
    }
    setNHtml(preNHtml);
  }, []);

  return (
    <HTMLContainer
      dangerouslySetInnerHTML={{
        __html: getInjectableHTML(nHtml),
      }}
    />
  );
};

export default CommentRender;
